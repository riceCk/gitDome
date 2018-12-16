/**
 * 对配置文件server.conf进行对象封装
 */
let fs = require('fs')
let conf = fs.readFileSync('./server.conf')
let globalConfig = {}
let configArr = conf.toString().split('\r\n')
for(let i = 0; i < configArr.length; i++) {
	let key = configArr[i].split('=')[0]
	let value = configArr[i].split('=')[1]
	globalConfig[key] = value
}
module.exports = globalConfig
