const program = require('commander')

const {
  readFile,
  createFile,
  replaceType,
  ejsCompire
} = require('./utils.js')
const path = require('path')

const createCommands = (ROOT_PATH) => {
  program.command('init').description("初始化插件——生产入口文件").action(async () => {
    let content = await readFile(ROOT_PATH + '/lib/template/init')
    //  createFile('./entry_file_to_ts', content)
    createFile(ROOT_PATH + '/entry_file_to_ts', content)
  })
  // program.command('create <fileName> [destination]')
  //   .description('create file')
  //   .action(async (fileName, destination) => {
  //     let data = await readFile(ROOT_PATH + '/entry_file_to_ts')
  //     let reg = /##?\s?(.*)\n/ig
  //     let regResult = reg.exec(data)

  //     let tsName = regResult[1]
  //     let tsStr = ''
  //     data = data.replace(regResult[0], '')
  //     data.split('\n').filter(v => !!v).forEach(item => {

  //       let itemTemp = item.split('\t')
  //       tsStr += `/** ${itemTemp[0]=== 'id' ? 'ID': itemTemp[1]} **/\n${itemTemp[0]}: ${replaceType[ itemTemp[2]] ? replaceType[ itemTemp[2]] : itemTemp[2]}\n`

  //     });

  //     let result = await ejsCompire(ROOT_PATH + '/lib/template/ts-file.ts.ejs', {
  //       interfaceName: tsName,
  //       content: tsStr
  //     })

  //     createFile(path.join(ROOT_PATH, destination, fileName), result)

  //   });
  program.command('create <fileName> [destination]')
    .description('create file')
    .action(async (fileName, destination) => {
      let data = await readFile(ROOT_PATH + '/entry_file_to_ts')
      let arr = data.split('##').filter(v => !!v).map(v => v.split('\n').filter(v => !!v))
      let resultArr = []
      arr.forEach((item,i) => {
        let tsStr = ''
        let interfaceName = ''
       item.forEach((item2,i2) => {
        if (i2 === 0) {
          interfaceName = item2.trim()
        } else {
          let lineData = item2.split('\t')
           tsStr += `/** ${lineData[0]=== 'id' ? 'ID': lineData[1]} **/\n${lineData[0]}: ${replaceType[ lineData[2]]|| lineData[2]};\n`
        }
       })
       resultArr.push({
        interfaceName,
        content:tsStr
       })
      })

       let result = await ejsCompire(ROOT_PATH + '/lib/template/ts-file.ts.ejs', {
        data: resultArr
       })

        createFile(path.join(ROOT_PATH, destination, fileName), result)

    });
}
module.exports = createCommands