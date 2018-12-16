/**
 * 对student表的相关查询
 * 每个表都有对应的配置文件
 */
let dbutil = require('./dbutil.js');
function queryAllStudent (success) {
	let querySql = 'select * from student'
	let connection = dbutil.createConnection()
	connection.connect()
	connection.query(querySql, function(error, result) {
		if (error == null) {
			success(result)
		} else {
			return error
		}
	})
	connection.end()
}
function queryStudentByClassAndAge(classNum, age, success) {
	let querySql = `select * from student where class = ? and age = ?;`
	let queryParams = [classNum, age]
	let connection = dbutil.createConnection()
	connection.connect()
	connection.query(querySql, queryParams, function(error, result) {
		if (error == null) {
			success(result)
		} else {
			return error
		}
	})
	connection.end()
}

function queryStudentByStuNum(stuNum, success) {
	let querySql = `select * from student where stu_num = ?`
	let connection = dbutil.createConnection()
	connection.connect()
	connection.query(querySql, stuNum, function(error, result) {
		if (error == null) {
			success(result)
		} else {
			return error
		}
	})
	connection.end()
}

module.exports = {
	"queryAllStudent": queryAllStudent,
	"queryStudentByClassAndAge": queryStudentByClassAndAge,
	"queryStudentByStuNum": queryStudentByStuNum
}
