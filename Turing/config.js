/**
 * 对server.conf进行格式化
 */
let fs = require('fs')
let conf = fs.readFileSync('./server.conf')
let globalConfig = {}
let configArr = conf.toString().split('\r\n')
for (let i = 0; i < configArr.length; i++) {
	let key = configArr[i].split('=')[0].trim()
	let value = configArr[i].split('=')[1]
	globalConfig[key] = value
}
console.log(globalConfig)
module.exports = globalConfig
