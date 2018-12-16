/**
 * 日志的处理
 */
let fs = require('fs')
let globalConfig = require('./config.js')

let fileName = globalConfig.log_path + globalConfig.log_name

function log(data) {
	fs.appendFile(fileName, data + '\n', function() {})
}

module.exports = log
