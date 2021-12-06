var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

function getMockPath(mockPath) {
  const fileGroup = fs.readdirSync(mockPath);
  const mock = fileGroup.map((item) => ({
    path: '/' + item.split('_').join('/').split('.')[0],
    fileName: mockPath + '/' + item
  }))
  return mock;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

getMockPath(path.resolve(__dirname, '../mock')).forEach((item, index) => {
  router.get(item.path, function(req, res, next) {
    res.send(require(item.fileName).response);
  })
})

module.exports = router;
