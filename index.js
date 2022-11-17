#!/usr/bin/env node
'use strict'
const program = require('commander')
const path = require('path')
const createCommands = require('./lib/code/create')
 const  ROOT_PATH = __dirname
const {
  isFileExists,
  createFile,
  readFile
} = require('./lib/code/utils')
const helpOptions = require('./lib/help/help')
const term = require('terminal-kit').terminal

helpOptions()

createCommands(ROOT_PATH)

// 配置cli信息、版本、说明等
program.version(require('./package.json').version).description(term.yellow('文件转ts类型工具'))
console.log()
// 接管命令行输入、参数处理
program.parse(process.argv)

