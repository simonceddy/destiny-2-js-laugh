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

  console.log(modelName);

  const body = `const Model = require('./Model');

class ${modelName} extends Model {
  static table = '${name}';
}

module.export = ${modelName};
`;

  fs.writeFileSync(path.resolve(modelsPath, `${modelName}.js`), body);
}

tableList.forEach((n) => {
  makeModel(n);
});
