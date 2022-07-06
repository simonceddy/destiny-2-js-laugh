// Require external packages or node bits
const fs = require('fs');
const path = require('path');
const https = require('node:https');
const { async: Szip } = require('node-stream-zip');
const { STORAGE_DIR } = require('../support/consts');

// TODO make request async instead of onComplete callback

/**
 * Fetch the Destiny 2 database from the current manifest
 * @param {import('node-destiny-2')} api The Destiny 2 API object
 * @param {Function} onComplete a callback function to run post-process
 * @returns {Promise<string|false>}
 */
async function getDatabase(api) {
  const { Response } = await api.getManifest();

  if (!Response) {
    console.error('error!');
    return false;
  }

  const dbPath = Response.mobileWorldContentPaths.en;
  const opts = { ...api.options, path: dbPath, method: 'GET' };
  const zipPath = path.resolve(STORAGE_DIR, 'current.zip');
  const filePath = path.resolve(STORAGE_DIR, dbPath.split('/').pop());
  const chunks = [];

  const promise = new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });
      res.on('end', async () => {
        const buffer = Buffer.concat(chunks);

        console.log('No more data in response.');
        fs.writeFileSync(zipPath, buffer);
        console.log('Extracting database from zip. Please wait as this may take some minutes.');
        const zip = new Szip({
          storeEntries: true,
          file: zipPath
        });
        zip.on('extract', () => console.log('Zip extracted successfully'));
        await zip.extract(
          null,
          STORAGE_DIR
        );

        await zip.close();
        console.log('zip closed');

        fs.unlinkSync(zipPath);

        return resolve(filePath);
      });
    });

    req.on('response', () => console.log('response received'));

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
      return reject(e);
    });

    req.write('');
    req.end();
  });

  return Promise.resolve(promise);

  // return filePath;
}

module.exports = getDatabase;
