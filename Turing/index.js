/**
 *  node搭建服务器
 */
let http = require('http')
let url = require('url')
let fs = require('fs')
let globalConfig = require('./config.js')
let loader = require('./loader.js')
http.createServer(function(request, response) {
	let pathname = url.parse(request.url).pathname
	let is = isStaticFile(pathname)
	if (is) { // 静态
		try {
			let data = fs.readFileSync('.' + globalConfig.page_path + pathname)
			response.writeHead(200);
			response.write(data);
			response.end()
		} catch(err) {
			response.writeHead(404);
			response.write('<html><body><h1>404 NotFound</h1></body></html>');
			response.end()
		}
	} else { // 动态
		if (loader.get(pathname) != null) {
			try {
				let params = url.parse(request.url, true).query
				let data = {
					"reqType":0,
					"perception": {
						"inputText": {
							"text": params.text
						},
					},
					"userInfo": {
						"apiKey": "23205b08fa6b4fe0aa041e3e5e6b3f86",
						"userId": "123123"
					}
				}
				loader.get(pathname)(request, response, data)
			} catch (err) {
				response.writeHead(500)
				response.write(err)
				response.end()
			}
		} else {
			response.writeHead(404)
			response.write('<html><body><h1>404</h1></body></html>')
			response.end()
		}
	}

}).listen(globalConfig.port)
if (globalConfig.static_file_type) {
	globalConfig.static_file_type = globalConfig.static_file_type.split('|')
} else {
	throw new Error('配置文件异常，缺少：static_file_type')
}
function isStaticFile(pathname) {
	let staticFile = globalConfig.static_file_type
	for (let i = 0; i < staticFile.length; i++ ){
		let temp = staticFile[i]
		if (pathname.indexOf(temp) !== -1 && pathname.indexOf(temp) == pathname.length - temp.length) {
			return true
		}
	}
	return false
}
