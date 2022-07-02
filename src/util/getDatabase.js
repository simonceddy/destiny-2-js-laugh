const fs = require('fs');
const path = require('path');
const https = require('node:https');
const { async: Szip } = require('node-stream-zip');

const storageDir = path.resolve(__dirname, '../../storage/');

// TODO make request async instead of onComplete callback
/**
 * Fetch the Destiny 2 database from the current manifest
 * @param {import('node-destiny-2')} api The Destiny 2 API object
 * @returns {Promise<string|false>}
 */
async function getDatabase(api, onComplete) {
  const { Response } = await api.getManifest();
  if (!Response) {
    console.error('error!');
    return false;
  }
  const dbPath = Response.mobileWorldContentPaths.en;
  const opts = { ...api.options, path: dbPath, method: 'GET' };
  const zipPath = path.resolve(storageDir, 'current.zip');
  const filePath = path.resolve(storageDir, dbPath.split('/').pop());
  const chunks = [];
  const req = https.request(opts, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk));
    });
    res.on('end', async () => {
      const buffer = Buffer.concat(chunks);
      console.log('No more data in response.');
      fs.writeFileSync(zipPath, buffer);
      const zip = new Szip({
        storeEntries: true,
        file: zipPath
      });
      zip.on('extract', () => console.log('Zip extracted successfully'));
      await zip.extract(
        null,
        storageDir
      );
      await zip.close();
      if (onComplete) onComplete(filePath);
    });
  });
  req.on('response', () => console.log('response received'));

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // Write data to request body
  req.write('');
  req.end();
  // console.info(req);
  return filePath;
}

module.exports = getDatabase;
