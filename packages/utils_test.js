const  utils = require('./utils');

// utils.getMockPath('./mock');
const fs = require('fs');
const path = require('path');
// console.log(fs.readFile(path.resolve('')))

console.log(path.resolve() + '/README.md');

console.log(fs.readFile(path.resolve() + '/README.md', 'utf8', (err, data) => {
  console.log(data.split('##'))
}))