const { storeJsonFile, storagePath } = require('./storage');

/**
 * Fetch the manifest and persist to storage
 * @param {import('node-destiny-2')} app The Destiny2API object
 * @return {Promise<boolean>}
 */
async function fetchManifest(app) {
  try {
    const { Response } = await app.getManifest();
    if (Response) {
      return storeJsonFile(storagePath('manifest.json'), Response);
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = fetchManifest;
