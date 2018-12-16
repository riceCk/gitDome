/**
 * 服务器启动主页，
 * 进行页面各个请求的处理
 */
let http = require('http')
let url = require('url')
let fs = require('fs')
let globalConfig = require('./config.js')
let loader = require('./loader.js')
let log = require('./log')
let filterSet = require('./filterLoader') // 登录拦截器

http.createServer(function(request, response) {
	let pathName = url.parse(request.url).pathname
	let isStatic = isStaticsRequest(pathName)
	for (let i = 0; i < filterSet.length; i++) {
		let flag = filterSet[i](request, response);
		if (!flag) {
			return;
		}
	}
	if(isStatic) {
		try {
			let data = fs.readFileSync(__dirname + globalConfig['page_path'] + pathName)
			response.writeHead(200)
			response.write(data)
			response.end()
		} catch (err) {
			response.writeHead(404)
			response.write('<html><body><h1>404</h1></body></html>')
			response.end()
		}

	} else {
			if(loader.get(pathName) != null) {
				try {
					loader.get(pathName)(request, response)
				} catch(err) {
					response.writeHead(500)
					response.write('<html><body><h1>500</h1></body></html>')
					response.end()
				}
			} else {
				response.writeHead(404)
				response.write('<html><body><h1>404</h1></body></html>')
				response.end()
			}
	}
}).listen(globalConfig['port'])
log('服务以启动')
if (globalConfig.static_file_type) {
	globalConfig.static_file_type = globalConfig.static_file_type.split('|')
} else {
	throw new Error('配置文件异常，缺少：static_file_type')
}
function isStaticsRequest(pathName) {
	for(let i = 0; i < globalConfig.static_file_type.length; i++) {
		let temp = globalConfig.static_file_type[i]
		if (pathName.indexOf(temp) !== -1 && pathName.indexOf(temp) == pathName.length - temp.length) {
			return true
		}
	}
	return false
}
