const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const template = require('./template');

const watcher = chokidar.watch(path.resolve(__dirname, '../mock'), {
  ignored: /.*\.(?!js$)/,
});

function getFilename(path) {
  const tmp = path.split('/');
  const filename = tmp[tmp.length - 1].slice(0, -3);
  return '/' + filename.split(/_+/).join('/');
}

watcher.on('change', (key) => {
  const filePath = getFilename(key);
  const file = filePath.split('/');
  const fileName = file[file.length - 1];
  const basePath = path.resolve(__dirname, '../src/apis' + filePath + '.ts');
  const dirPath = path.resolve(__dirname, '../src/apis/' + file[1]);
  const data = require(key);
  const config = {
    requestPath: '',
  };
  if (fs.existsSync(dirPath)) {
    !fs.existsSync(basePath) && fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
  } else {
    fs.mkdirSync(dirPath);
    fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));
  }
});
