const fs = require('fs');
const path = require('path');
const https = require('node:https');
// const SZIP = require('node-stream-zip');
const D2 = require('node-destiny-2/lib/destiny-2-api');
// const promiseRequest = require('node-destiny-2/lib/async-https');

class D2API extends D2 {
  constructor(config = {}) {
    if (!config.key) {
      console.error('No app key provided');
    }
    super(config);
    console.log(config);

    this.dbPath = null;
  }

  async db() {
    if (!this.dbPath) {
      const { Response } = await this.getManifest();
      if (!Response) { console.error('error!'); } else {
        this.dbPath = Response.jsonWorldContentPaths.en;
      }
    }
    const opts = { ...this.options, path: this.dbPath, method: 'GET' };
    const zipPath = path.resolve(__dirname, '../storage/current.json');
    const chunks = [];
    const req = https.request(opts, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      res.on('end', () => {
        console.log('No more data in response.');
        fs.writeFileSync(zipPath, chunks.join(''));
        // const zip = new SZIP({
        //   file: zipPath,
        //   storeEntries: true
        // });
        // zip.on('error', (err) => console.error(err));
        // zip.on('ready', () => zip.extract(
        //   this.dbPath,
        //   path.resolve(__dirname, '../storage/manifest.content'),
        //   (err) => console.error(err)
        // ));
      });
    });
    req.on('response', () => console.log('response received'));

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write('hi');
    req.end();
    // console.info(req);
    return this.dbPath;
  }
}

module.exports = D2API;
