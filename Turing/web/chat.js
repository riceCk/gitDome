/**
 * 接口
 */
let path = new Map()
let req = require('request') // 需要添加新模块

function chat(request, response, data) {
	let contents = JSON.stringify(data)
	req({
		url: 'http://openapi.tuling123.com/openapi/api/v2',
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: contents
	}, function(err, resp, body) {
		if(!err && resp.statusCode == 200) {
			let obj = JSON.parse(body)
			let head = {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers": "x-request-with , content-type",
			}
			response.writeHead(200, head)
			if (obj && obj.results && obj.results.length > 0 && obj.results[0].values) {
				response.write(JSON.stringify(obj.results[0].values))
				response.end()
			} else {
				response.write("{\"text\":\"我不知道你说的什么\"}")
				response.end()
			}
		} else {
			// 否则给前端404
			response.writeHead(400)
			response.write('数据异常')
			response.end()
		}
	})
}
path.set('/api/chat', chat)


module.exports.path = path
