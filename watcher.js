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
  let filePath = getFilename(key);
  console.log(filePath)
  const file = filePath.split('/');
  const fileName = processKeyWord(file[file.length - 1]);
  file[file.length-1] = fileName
  filePath = file.join('/')
  const basePath = path.resolve(__dirname, config.apisPath + filePath + '.ts');
  let initPath = path.resolve(__dirname, config.apisPath + '/');
  for(let i = 1; i < file.length - 1; i++) {
    initPath = initPath + '/' + file[i]
    if(!fs.existsSync(initPath)) {
      fs.mkdirSync(initPath);
      // fs.writeFileSync(dirPath + '/index.ts', template.getIndexTemplate(fileGroup));
    }
  }
  const data = require(key);
  // if (fs.existsSync(dirPath)) {
    !fs.existsSync(basePath) && fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
    let indexPath = basePath.split('/')
    indexPath.pop();
    indexPath = indexPath.join('/')
    const fileGroup = fs
    .readdirSync(indexPath)
    .map((item) => {
      if (item.includes('.ts')) {
       return item.split('.')[0]
      }
    })
    .filter((item) => item !== 'index');
    fs.writeFileSync(indexPath + '/index.ts', template.getIndexTemplate(fileGroup));
  // } else {
    // fs.mkdirSync(dirPath);
    // fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
    // const fileGroup = fs
    //   .readdirSync(dirPath)
    //   .map((item) => item.split('.')[0])
    //   .filter((item) => item !== 'index');
    // fs.writeFileSync(dirPath + '/index.ts', template.getIndexTemplate(fileGroup));
  // }
});
