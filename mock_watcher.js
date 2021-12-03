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
            workTree.push(path)
        }
    }
})

watcher.on('change', path => {

})

watcher.on('unlink', path => {
    let index = workTree.indexOf(path);
    workTree.splice(index, 1);
})

watcher.on('ready', () => {
    isReady = true
})