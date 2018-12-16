/**
 * 对应login.html页面的js请求接口
 * 对应每个接口逻辑处理后端传的值
 */
let path  = new Map()
let url = require('url')
let studentService = require('../service/studentService')
function getData(request, response) {
	studentService.queryAllStudent(function(result) {
		let resArr = [];
		for (let i = 0; i < result.length; i++) {
			resArr.push(result[i].name)
		}
		response.writeHead(200)
		response.write(resArr.toString())
		response.end()
	})
}

path.set('/getData', getData)

function login (request, response) {
	let params = url.parse(request.url, true).query
	request.on("data", function(data) {
		let stuNum = data.toString().split('&')[0].split('=')[1]
		let password = data.toString().split('&')[1].split('=')[1]
		studentService.queryStudentByStuNum(stuNum, function(result) {
			let res = ''
			if (result == null || result.length == 0) {
				res = 'Fail'
				// form表单传值的判断利用重定向
				response.writeHead(302, {'location': '/login.html'})
				response.end()
			} else {
				if (result[0].pwd === password) {
					res = 'ok'
					// form表单传值的判断利用重定向
					response.writeHead(302, {
						'location': '/main.html',
						'Set-Cookie': 'id=' +  result[0].id
					})
					response.end()
				} else {
					res = 'Fail'
					// form表单传值的判断利用重定向
					response.writeHead(302, {'location': '/login.html'})
					response.end()
				}
			}
			// 利用请求的ajax
			// response.write(res)
			// response.end()


		})
	})

}
path.set('/login', login)

module.exports.path = path
