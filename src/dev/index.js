const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const tablesListPath = path.resolve(__dirname, '../../etc/tables.csv');
const modelsPath = path.resolve(__dirname, '../models');

if (!fs.existsSync(tablesListPath)) {
  console.log('cannot find tables list');
  exit(0);
}

const prefix = 'Destiny';
const suffix = 'Definition';

const tableList = fs.readFileSync(tablesListPath).toString().split(',');

function makeModel(name = '') {
  if (!fs.existsSync(modelsPath) || !fs.lstatSync(modelsPath).isDirectory()) {
    fs.mkdirSync(modelsPath);
  }

  const modelName = name === 'DestinyClassDefinition'
    ? 'CharacterClass'
    : name.substring(
      prefix.length,
      name.length - suffix.length
    );

  // console.log(modelName);
  const modelPath = path.resolve(modelsPath, `${modelName}.js`);
  if (fs.existsSync(modelPath)) {
    return 0;
  }
  const body = `const Model = require('./Model');

class ${modelName} extends Model {
  static table = '${name}';

  constructor(hash) {
    super(hash, ${modelName}.table);
  }
}

module.exports = ${modelName};
`;

  fs.writeFileSync(modelPath, body);
  return 1;
}

tableList.forEach((n) => {
  makeModel(n);
});
