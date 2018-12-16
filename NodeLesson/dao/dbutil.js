/**
 *  对mysql进行连接配置
 */

let mysql = require('mysql')
// 创建mysql连接
function createConnection () {
	let connection = mysql.createConnection({
		host: '127.0.0.1',
		port: '3306',
		user: 'root',
		password: '123456',
		database: 'school'
	})
	return connection
}
module.exports.createConnection = createConnection
