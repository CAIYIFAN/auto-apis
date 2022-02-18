const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const template = require('../utils/template');
const utils = require('../utils');
const { processKeyWord, getFilename, isEmpty } =  utils;
const { fixedPath } = require('../constants')
const config = require(fixedPath + '/mock_config');

// 监听mock文件夹的修改以生成ts类型
const watcher = chokidar.watch(path.resolve(__dirname, fixedPath + config.mockPath), {
  ignored: /.*\.(?!js$)/,
});

function start () {
  watcher.on('change', (key) => {
    console.log('唱歌')
    // 清除require缓存
    delete require.cache[require.resolve(key)]
    // 获取mock数据
    const data = require(key);
    if (!data.autoTs) {
      console.log('不需要自动生成ts')
      return false
    }
    // 请求路径
    let filePath = getFilename(key);
    const file = filePath.split('/');
    // 生成文件名
    const fileName = processKeyWord(file[file.length - 1]);
    // 修改文件名
    file[file.length-1] = fileName
    // 重组成路径
    filePath = file.join('/')
    // 生成的ts文件的存放地址
    const basePath = path.resolve(__dirname, fixedPath + config.apisPath + filePath + '.ts');
    // 根目录
    let initPath = path.resolve(__dirname, fixedPath + config.apisPath + '/');
    // 检查上级目录是否存在，不存在则生成
    for(let i = 1; i < file.length - 1; i++) {
      initPath = initPath + '/' + file[i]
      if(!fs.existsSync(initPath)) {
        fs.mkdirSync(initPath);
      }
    }
    // 检查是否存在要生成的ts文件，不存在则生成
    if (!fs.existsSync(basePath)) {
      if (!data.query) {
        console.log('缺失query，终止！！！')
        return false;
      }
      if (isEmpty(data.query)) { 
        console.log('query为空，注意！！！')
      }
      if (isEmpty(data.response)) {
        console.log('response为空，终止！！！')
        return false;
      }
      console.log(`监听到mock文件${key}修改，自动生成ts文件`)
      fs.writeFileSync(basePath, template.getTsTemplate({ fileName, data, config }));

      // index文件的目录
      let indexPath = basePath.split('/')
      indexPath.pop();
      indexPath = indexPath.join('/')
      
      // 获取要生成index目录的所有ts文件
      const fileGroup = fs
        .readdirSync(indexPath)
        .map((item) => {
          if (item.includes('.ts')) {
            return item.split('.')[0]
          }
        })
        .filter((item => item !== undefined))
        .filter((item) => item !== 'index');
      // 生成index.ts文件  
      fs.writeFileSync(indexPath + '/index.ts', template.getIndexTemplate(fileGroup));
    }     
  });
}

module.exports = {
  start
}