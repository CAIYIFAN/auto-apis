var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const config = require('../../mock_config');

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

console.log(config)
getMockPath(path.resolve(__dirname, '../..'+ config.mockPath)).forEach((item, index) => {
  router.get(item.path, function(req, res, next) {
    res.send(require(item.fileName).response);
  })
})

module.exports = router;
