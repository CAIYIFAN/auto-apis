const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const template = require('./template')

const watcher = chokidar.watch(path.resolve(__dirname, './mock'), {
    ignored: /.*\.(?!js$)/,
});

const log = console.log

const workTree = []
let isReady = false

watcher.on('add', path => {
    if (!isReady) {
        workTree.push(path);
    } else {
        if (!workTree.includes(path)) {
            const fileGroup = path.split('/')
            const requestPath = '/' + fileGroup[fileGroup.length-1].split('_').join('/').split('.')[0]
            fs.writeFileSync(path, template.getMockTemplate(requestPath))
        }
    }
})

watcher.on('change', path => {

})

watcher.on('unlink', path => {

})

watcher.on('ready', () => {
    isReady = true
})

// More possible events.
watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes', workTree))
  .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
  });