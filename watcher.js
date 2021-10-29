const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const template = require('./template');

const watcher = chokidar.watch(path.resolve(__dirname, './mock'), {
  ignored: /.*\.(?!js$)/,
});

function getFilename(path) {
  const ar = path.split('/');
  const filename = ar[ar.length - 1].slice(0, -3);
  return '/' + filename.split(/_+/).join('/');
}

watcher.on('change', (key) => {
  const filePath = getFilename(key);
  const file = filePath.split('/');
  const fileName = file[file.length - 1];
  const basePath = path.resolve(__dirname, '../src/apis' + filePath + '.ts');
  const dirPath = path.resolve(__dirname, '../src/apis/' + file[1]);
  const data = require(key);
  const fileGroup = fs
    .readdirSync(dirPath)
    .map((item) => item.split('.')[0])
    .filter((item) => item !== 'index');
  const config = {
    requestPath: '@/common/request',
  };
  if (fs.existsSync(dirPath)) {
    !fs.existsSync(basePath) && fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
    fs.writeFileSync(dirPath + '/index.ts', template.getIndexTemplate(fileGroup));
  } else {
    fs.mkdirSync(dirPath);
    fs.writeFileSync(dirPath + '/index.ts', template.getIndexTemplate(fileGroup));
    fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
  }
});
