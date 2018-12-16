/**
 * @desc
 * @param  {}
 * @return {}
 * @time
 */
let path = new Map()
function api(request, response) {
	console.log('接口访问成功123')
}
path.set('/api', api)

module.exports.path = path
