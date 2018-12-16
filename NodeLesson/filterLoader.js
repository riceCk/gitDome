/**
 * 拦截器整合，用于整合文件夹filter下所有文件
 */
let fs = require('fs')
let globalConfig = require('./config')
let files = fs.readdirSync(globalConfig['filter_path'])
let filterSet = []

for (let i = 0; i < files.length; i++) {
	let temp = require('./' + globalConfig['filter_path'] + '/' + files[i])
	filterSet.push(temp)
}
module.exports = filterSet;
