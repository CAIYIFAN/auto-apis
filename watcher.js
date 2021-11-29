const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const template = require('./template');
const utils = require('./utils');
const { processKeyWord, getFilename } =  utils;

const config = {
  mockPath: './mock',
  requestPath: '@/common/request',
  requestGet: 'requestGet',
  requestPost: 'requestPost',
  apisPath: './src/apis'
}

const watcher = chokidar.watch(path.resolve(__dirname, config.mockPath), {
  ignored: /.*\.(?!js$)/,
});

watcher.on('change', (key) => {
  const filePath = getFilename(key);
  const file = filePath.split('/');
  const fileName = processKeyWord(file[file.length - 1]);
  const basePath = path.resolve(__dirname, config.apisPath + filePath + '.ts');
  const dirPath = path.resolve(__dirname, config.apisPath + '/' + file[1]);
  const data = require(key);
  if (fs.existsSync(dirPath)) {
    const fileGroup = fs
      .readdirSync(dirPath)
      .map((item) => item.split('.')[0])
      .filter((item) => item !== 'index');
    !fs.existsSync(basePath) && fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
    fs.writeFileSync(dirPath + '/index.ts', template.getIndexTemplate(fileGroup));
  } else {
    fs.mkdirSync(dirPath);
    const fileGroup = fs
      .readdirSync(dirPath)
      .map((item) => item.split('.')[0])
      .filter((item) => item !== 'index');
    fs.writeFileSync(dirPath + '/index.ts', template.getIndexTemplate(fileGroup));
    fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
  }
});
