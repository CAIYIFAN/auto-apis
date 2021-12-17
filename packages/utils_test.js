const  utils = require('./utils');

// utils.getMockPath('./mock');
const fs = require('fs');
const path = require('path');
// console.log(fs.readFile(path.resolve('')))

// console.log(path.resolve() + '/README.md');

// console.log(fs.readFile(path.resolve() + '/README.md', 'utf8', (err, data) => {
//   console.log(data.split('##'))
// }))

const { unified } = require('')


main()

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process('# Hello, Neptune!')

  console.log(String(file))
}