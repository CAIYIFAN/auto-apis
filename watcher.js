const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const template = require('./template');

const watcher = chokidar.watch(path.resolve(__dirname, './src/apis'), {
  ignored: /.*\.(?!ts$)/,
});

watcher.on('change', (key) => {
  const filePath = key.split('/apis')[1].split('.ts')[0]
  const file = key.split('/')
  const fileName = file[file.length - 1].split('.ts')[0]
  console.log(filePath, fileName)
})
