/**
 * 整合接口
 */
let fs = require('fs')
let globalConfig = require('./config.js')
let controllerSet = []
let files = fs.readdirSync(globalConfig['web_path'])
let pathMap = new Map()

for (let i = 0; i < files.length; i++) {
	let temp = require('./' + globalConfig['web_path'] + files[i])
	if (temp.path) {
		for (let [key, value] of temp.path) {
			if (pathMap.get(key) == null) {
				pathMap.set(key, value)
			} else {
				throw  new Error('url path异常重复，url:' + key)
			}
			controllerSet.push(temp)
		}
	}
}

module.exports = pathMap
