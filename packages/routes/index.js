var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { fixedPath } = require('../constants')
const config = require(fixedPath +'/mock_config');

function getMockPath(mockPath) {
  const fileGroup = fs.readdirSync(mockPath);
  const mock = fileGroup.map((item) => ({
    // mock服务请求地址
    path: '/mock/' + item.split('_').join('/').split('.')[0],
    // 本地mock文件地址
    fileName: mockPath + '/' + item
  }))
  return mock;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

getMockPath(path.resolve(__dirname, fixedPath + config.mockPath)).forEach((item, index) => {
  router.get(item.path, function(req, res, next) {
    res.send(require(item.fileName).response);
  })
})

module.exports = router;
