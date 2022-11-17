const program = require('commander')

const helpOptions = () => {
  program
    .option('-d, --debug', '文件路径 例如: -d src/pages, 错误/src/pages')
   
    program.on('--help',() => {
      console.log("transTs -d -n");
  
    })
 
}

module.exports = helpOptions