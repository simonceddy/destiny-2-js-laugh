// Require external packages or node bits
const fs = require('fs');
const path = require('path');
const https = require('node:https');
const { async: Szip } = require('node-stream-zip');

// Points to the storage directory on the filesystem
const storageDir = path.resolve(__dirname, '../../storage/');

// TODO make request async instead of onComplete callback
// TODO cleanup of zip file after database is extracted

/**
 * Fetch the Destiny 2 database from the current manifest
 * @param {import('node-destiny-2')} api The Destiny 2 API object
 * @param {Function} onComplete a callback function to run post-process
 * @returns {Promise<string|false>}
 */
async function getDatabase(api, onComplete) {
  // Get manifest data from bungie api, which is the api object just upward
  const { Response } = await api.getManifest();

  // Hollar if there is no data and return false
  if (!Response) {
    console.error('error!');
    return false;
  }

  // Get the path to the sqlite database from the manifest data
  const dbPath = Response.mobileWorldContentPaths.en;

  // Put together the https request options
  // This uses the options already set in the api
  const opts = { ...api.options, path: dbPath, method: 'GET' };

  // The resolved filepath of the zip file that will be downloaded
  // AKA where it will be put on the filesystem
  const zipPath = path.resolve(storageDir, 'current.zip');

  // The filepath of the extracted sqlite database on the filesystem
  // This is set on a per request basis since database names will differ
  const filePath = path.resolve(storageDir, dbPath.split('/').pop());

  // This empty array is where the chunks of data will be stored before
  // they are saved as a zip file
  const chunks = [];

  // This monstrous beast is a nodejs https request
  // It asks bungie.net to fang us the database file
  const req = https.request(opts, (res) => {
    // In this bit we define how we handle the response to our polite request
    // The response is the res object just up top inside them brackos.

    // TODO handle bad status code
    console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    // On our response deal we set some event listeners
    // These are functions that are run when a certain event occurs
    // In this case, events are data received from the response, and when the
    // response ends AKA all the chunks of data have been sent to us
    res.on('data', (chunk) => {
      // Each chunk received is converted into a buffer object
      // This is because the chunk is binary data
      chunks.push(Buffer.from(chunk));
    });
    res.on('end', async () => {
      // When all data is received, all the chunks of buffer bits are
      // 'concatenated' (aka put together) into a single buffer
      const buffer = Buffer.concat(chunks);

      console.log('No more data in response.');

      // Now we save the zip file to the filesystem
      fs.writeFileSync(zipPath, buffer);

      // Next, we load up the zip file using this Szip dealio
      const zip = new Szip({
        storeEntries: true,
        file: zipPath
      });

      // This is another event listener
      // This runs a function when the zip file has been fully unzipped
      // All the function does is tell you it happened
      zip.on('extract', () => console.log('Zip extracted successfully'));

      // Now we unzip that zip
      await zip.extract(
        null,
        storageDir
      );

      // And once all that unzipping is done we can close the zip file
      await zip.close();

      // And this bit allows a function to be run after stuff is all done.
      // The main purpose is to change the wild name of the extracted sqlite
      // database
      if (onComplete) onComplete(filePath);
    });
  });

  // More event listeners but this time on the request object itself
  // This just tells us that we got a response from bungie
  req.on('response', () => console.log('response received'));

  // This cryptic riddle tells us of any errors
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // Write data to request body to initiate sending it.
  req.write('');
  // And then we stop sending it
  req.end();

  // Finally the filepath is returned for alternative means of renaming
  return filePath;
}

module.exports = getDatabase;
