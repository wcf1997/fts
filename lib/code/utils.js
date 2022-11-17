const fs = require('fs')
const path = require("path")
const ejs = require('ejs')
// 判断文件是否存在
const isFileExists = async function (dir) {
  // return await fs.promises.access(url)
  //   .then(
  //     _ => true
  //   )
  //   .catch(error => false)
  return fs.existsSync(dir)
}

// 创建文件
const createFile = async function (dir, content) {
  const arr = dir.split(path.sep);

  const destination = arr.slice(0, -1).join('/');
  let isExist = await isFileExists(dir)
  if (isExist) return console.log(dir + "文件已存在!")
  deepMakePath(destination)
  fs.writeFile(dir,content,(err,data) => {
    if (!err) return console.log(dir  + "文件创建成功")
    console.error("文件创建失败",err)
  })

}

const ejsCompire = (fileName, data = {}, options = {}) => {
  return new Promise((resolve,reject) => {
    ejs.renderFile(fileName,data,options, (err,data) => {
      if (err){
        return reject(err)
      }
      return resolve(data)
    })
  })
}

const replaceType = {
  'integer(int64)':'number',
  'integer': 'number',
  'string(date-time)':'string'
}


// 读取文件
const readFile = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (!err) return resolve(data)
      reject(err)
    })

  })
}

// 递归生产目录
const deepMakePath = (dirPath) => {
  // path.sep 文件路径分隔符（mac 与 window 不同）
  // 转变成数组，如 ['a', 'b', 'c']
  let parts = dirPath.split(path.sep);
  for (let i = 1; i <= parts.length; i++) {
    // 重新拼接成 a a/b a/b/c
    let current = parts.slice(0, i).join(path.sep);
    // accessSync 路径不存在则抛出错误在 catch 中创建文件夹
    if (!current) continue
    try {
      fs.accessSync(current);
    } catch (e) {
      fs.mkdirSync(current);
    }
  }

  return

}

const getFullPath = (fileName, dirname, extname = '.ts') => {

  if (dirname.substr(-1, 1) !== '/') {
    dirname = dirname + '/'
  }
  if (!fileName.includes('.')) {
    fileName = fileName + extname
  }
  return dirname + fileName
}

module.exports = {
  createFile,
  isFileExists,
  readFile,
  getFullPath,
  replaceType, ejsCompire
}