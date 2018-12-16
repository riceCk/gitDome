/**
 *  对应student表进行对外释放的接口，不做逻辑处理
 */


let studentDao = require('../dao/studentDao')

function queryAllStudent(success) {
	studentDao.queryAllStudent(success)
}
function queryStudentByStuNum(params, success) {
	studentDao.queryStudentByStuNum(params, success)
}
module.exports = {
	"queryAllStudent": queryAllStudent,
	"queryStudentByStuNum": queryStudentByStuNum
}
