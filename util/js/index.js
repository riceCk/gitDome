let utils = require('./util.js')
let data = {
  name: 'ck',
  age: 12,
  max: 'man'
}
// utils.cacheFunc.cache = {}
let cacheData = utils.cacheFunc('name', data)
console.log(cacheData)
