const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const template = require('../utils/template')
const { fixedPath } = require('constants')
const config = require(fixedPath + '/mock_config');
const workTree = []
let isReady = false

// 监听mock文件夹
const watcher = chokidar.watch(path.resolve(__dirname, fixedPath + config.mockPath), {
  ignored: /.*\.(?!js$)/,
});

function start() {
  console.log('开启mock模版生成服务,监听路径：', path.resolve(__dirname, fixedPath + config.mockPath))
  // 在ready状态后，监听到文件新建则自动填充模版
  watcher.on('add', path => {
      if (!isReady) {
          workTree.push(path);
      } else {
          if (!workTree.includes(path)) {
              console.log(`监听到${path}文件生成`)
              const fileGroup = path.split('/')
              // 生成请求地址
              const requestPath = '/' + fileGroup[fileGroup.length-1].split('_').join('/').split('.')[0]
              console.log(`给${path}写入mock模版`)
              // 写入模版
              !!config.mockTemplate ? fs.writeFileSync(path, config.mockTemplate(requestPath)): fs.writeFileSync(path, template.getMockTemplate(requestPath))
              // fs.writeFileSync(path, template.getMockTemplate(requestPath))
              // workTree中记录该路径
              workTree.push(path)
          }
      }
  })
  // 监听到删除操作后，从workTree中剔除对应的文件路径
  watcher.on('unlink', path => {
    let index = workTree.indexOf(path);
    workTree.splice(index, 1);
  })
  // 记录ready状态
  watcher.on('ready', () => {
      isReady = true
  })
}

module.exports = {
  start
}