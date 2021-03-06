/**
 * 工具包
 * 2018-11-27
 * 陈凯
 */
// 校验规则函数
Validator.prototype.strategies = {
  isNonEmpty: function (value, errorMsg) {
	if (value === '') {
	  return errorMsg
	}
	return true
  },
  maxLength: function (value, length, errorMsg) {
	if (value.length > Number(length)) {
	  return errorMsg
	}
	return true
  },
  minLength: function (value, length, errorMsg) {
	if (value !== '' && value.length < Number(length)) {
	  return errorMsg
	}
	return true
  }
}
// 校验规则添加
Validator.prototype.extend = function (config) {
  this.strategies[config.type] = config.handler
}
// 添加校验的规则集合
Validator.prototype.add = function (dom, showDom, strategyArray) {
  // 校验对象， 校验提示对象， 校验规则数组对象
  // strategyArray: [
  // {strategy: 'isNonEmpty', errorMsg: '用户不能为空'},
  // {strategy: 'maxLength: 5', errorMsg: '用户名最大不能超过5'}
  //  ]
  this.showDom.push(showDom)
  strategyArray.forEach(ele => {
	this.cache.push(() => {
	  //type找到对应的校验规则
	  let typeArray = ele.strategy.split(':');
	  // shift方法从数组中返回第一个元素,此方法更改数组的长度
	  let type = typeArray.shift();
	  typeArray.unshift(dom.value)
	  typeArray.push(ele.errorMsg)
	  let msg = this.strategies[type].apply(this, typeArray)
	  if (msg != true) {
		showDom.innerText = msg
	  }
	  return msg
	})
  })
}
// 执行校验
Validator.prototype.start = function () {
  let flag = true
  this.showDom.forEach(dom => {
	dom.innerText = ''
  })
  this.cache.forEach(func => {
	if (func() !== true) {
	  flag = false
	}
  })
  return flag
}

function Validator() {
  // 缓存
  this.cache = []
  this.showDom = []
}
module.exports = {
  /**
   * @desc   任意时间Date置换成字符串
   * @param  {new Date}
   * @return {String}
   * @time 2018-11-28
   */
  getCurDate(toDay = new Date()) {
	let y = toDay.getFullYear()
	let m = add_zero(toDay.getMonth() + 1)
	let r = add_zero(toDay.getDate())
	let h = add_zero(toDay.getHours())
	let f = add_zero(toDay.getMinutes())
	let s = add_zero(toDay.getSeconds())

	function add_zero(temp) {
	  if (temp < 10) return '0' + temp
	  else return temp
	}

	return `${y}-${m}-${r} ${h}:${f}:${s}`
  },

  /**
   * @desc 联动getCurdate函数，获取几月之后的时间
   * @param {Number} mounth
   * @return {String} '
   * @time 2018-11-28
   */
  add_mounth(mounth = 0) {
	let data = new Date();
	data.setMonth(data.getMonth() + mounth)
	return this.getCurDate(data)
  },

  /**
   * @desc 封装滚动条
   * @param  {undefined}
   * @return {String} '
   * @time 2018-12-01
   */
  getScrollOffset() {
	if (window.pageXOffset) {
	  return {
		x: window.pageXOffset,
		y: window.pageYOffset
	  }
	} else {
	  return {
		x: document.body.scrollLeft + document.documentElement.scrollLeft,
		y: document.body.scrollTop + document.documentElement.scrollTop
	  }
	}
  },

  /**
   * @desc  标签属性值
   * @param  {dom， 属性}
   * @return {String} '
   * @time 2018-12-02
   */
  getStyle(elem, prop) {
	if (window.getComputedStyle) {
	  return window.getComputedStyle(elem, null)['prop']
	} else {
	  return elem.currentStyle['prop']
	}
  },

  /**
   * @desc  正则匹配
   * @param  {类型， 数据}
   * @return {Boolean} '
   * @time 2018-12-03，2018-12-05
   * @type: cardNo(身份证）、phone（手机号）、tel（固定电话）、email（邮箱）、QQ（QQ）
   *        carNum（车牌号）、chinese（汉字）、name（姓名）
   */
  regular(type, data) {
	let typeArray = {
	  'cardNo': checkCardNo(data),
	  'phone': checkPhone(data),
	  'tel': checkTel(data),
	  'email': checkEmail(data),
	  'QQ': checkQQ(data),
	  'carNum': checkCarNum(data),
	  'chinese': checkChinese(data),
	  'name': checkName(data)
	}
	return typeArray[type]

	function check(reg, data) {
	  if (reg.test(data)) {
		return true
	  } else {
		return false
	  }
	}

	// 身份证匹配
	function checkCardNo(data) {
	  let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
	  return check(reg, data)
	}

	// 手机号匹配
	function checkPhone(data) {
	  let reg = /^1(3|4|5|7|8)\d{9}$/
	  return check(reg, data)
	}

	// 固定电话
	function checkTel(data) {
	  let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
	  return check(reg, data)
	}

	// 邮箱
	function checkEmail(data) {
	  let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
	  return check(reg, data)
	}

	// QQ
	function checkQQ(data) {
	  let reg = /^[1-9]\d{4,9}$/
	  return check(reg, data)
	}

	// 车牌
	function checkCarNum(data) {
	  let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$|^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
	  return check(reg, data)
	}

	// 汉字
	function checkChinese(data) {
	  let reg = /[\u4e00-\u9fa5]/
	  return check(reg, data)
	}

	function checkName(data) {
	  let reg = /(^[\u4E00-\u9FA5]{2,4}$)|(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$)/
	  return check(reg, data)
	}
  },

  /**
   * @desc  防抖（解决用户输入，只需再输入完成后做一次效验即可）
   * @param  {事件函数， 延迟时间}
   * @time 2019-03-18
   */
  debounce(fn, wait, immediate) {
	let timer = null
	return function () {
	  let args = arguments
	  let context = this
	  if (immediate && !timer) {
		fn.apply(context, args)
	  }
	  if (timer) clearTimeout(timer)
	  timer = setTimeout(() => {
		fn.apply(context, args)
	  }, wait)
	}
  },


  /**
   * @desc  节流（处理按钮疯狂点击）
   * @param  {点击函数， 延迟时间}
   * @time 2018-12-06
   */
  throttle(handler, wait = 1000) {
	let lastTime = 0;
	return function (e) {
	  let nowTime = new Date().getTime() // 1970年一月一日
	  if (nowTime - lastTime > wait) {
		handler.apply(this, arguments)
		lastTime = nowTime
	  }
	}
  },
  /**
   * @desc  物体拖拽方法
   * @param  {目标div， 取消的父级}
   * @time 2018-12-07
   */
  dragEvent(ele, wrap) {
	let X, Y, boxL, boxT, disL, disT;
	let drag = false;
	ele.onmousedown = function (e) {
	  drag = true;
	  let event = e || window.event;
	  X = event.clientX;
	  Y = event.clientY;
	  boxL = ele.offsetLeft;
	  boxT = ele.offsetTop;
	  disL = X - boxL;
	  disT = Y - boxT;
	  console.log(disL, disT)
	}
	wrap.onmousemove = function (e) {
	  let event = e || window.event;
	  if (drag) {
		ele.style.left = event.clientX - disL + 'px';
		ele.style.top = event.clientY - disT + 'px';
	  }
	}
	ele.onmouseup = function () {
	  drag = false;
	}
  },

  /**
   * @desc  优化动画
   * requestAnimFrame: 开启定时器
   * cancelAnimFrame: 关闭定时器
   * @time 2018-12-26
   */
  requestAnimFrame() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) {
		  window.setTimeout(callback, 1000 / 60);
		};
  },
  cancelAnimFrame() {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		function (id) {
		  window.clearTimeout(id);
		};
  },

  /**
   * @desc  ie兼容事件绑定或消除延迟加载
   * @description 第一次调用总会消耗性能，随后调用会更快
   * @param （目标， 事件源， 函数）
   * addHandler: 绑定事件
   * removeHandler： 解绑事件
   * @time 2018-12-28
   */
  addHandler(target, eventType, handler) {
	if (target.addEventListener) {
	  this.addHandler = (target, eventType, handler) => {
		target.addEventListener(eventType, handler, false)
	  }
	} else {
	  this.addHandler = (target, eventType, handler) => {
		target.attachEvent('on' + eventType, handler)
	  }
	}
	this.addHandler(target, eventType, handler)
  },
  removeHandler(target, eventType, handler) {
	if (target.removeEventlistener) {
	  this.removeHandler = (target, eventType, handler) => {
		target.removeEventlistener(eventType, handler, false)
	  }
	} else {
	  this.removeHandler = (target, eventType, handler) => {
		target.detachEvent('on' + eventType, handler)
	  }
	}
	this.removeHandler(target, eventType, handler)
  },
  /**
   * @desc  缓存储存
   * @description 可提供获取的静态数据进行缓存
   * @param （键, 缓存内容）
   * @time 2019-01-07
   * @ 外部调用  utils.cacheFunc.cache = {}  必须加！！！
   */
  cacheFunc(cacheKey, result = {}) {
	if (!this.cacheFunc.cache[cacheKey]) {
	  this.cacheFunc.cache[cacheKey] = result;
	}
	return this.cacheFunc.cache[cacheKey];
  },
  /**
   * @desc  原型继承（圣杯模式）
   * @description 只继承原型的方法，不继承this上面的属性
   * @param （子级, 父级）
   * @time 2019-01-15
   */
  inherit(C, P) {
	let Fn = function () {
	}
	Fn.prototype = P.prototype;
	C.prototype = new Fn()
	C.uber = P.prototype
	C.prototype.constructor = C
  },
  /**
   * @desc  深度克隆
   * @description 克隆对象
   * @param （父级，子级（可选））
   * @time 2019-01-15
   */
  extendDeep(parent, child = {}) {
	let toStr = Object.prototype.toString;
	let astr = '[object Array]';
	for (let i in parent) {
	  if (parent.hasOwnProperty(i)) {
		if (typeof parent[i] === 'object') {
		  child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
		  extendDeep(parent[i], child[i]);
		} else {
		  child[i] = parent[i]
		}
	  }
	}
	return child
  },


  /**
   * @desc  缓存机制
   * @description 函数记忆
   * @param （函数）
   * @time 2019-02-18
   */
  memorize(f) {
	var cache = {};
	return function () {
	  var key = arguments.length + Array.prototype.join.call(arguments, ',');
	  if (key in cache) return cache[key];
	  else return cache[key] = f.apply(this, arguments);
	}
  },

  /**
   * @desc  函数构造单例模式
   * @description 将不是单例的服用函数变成单例
   * @param （函数）
   * @time 2019-03-25
   */
  getSingle(func) {
	let result;
	return function () {
	  if (!result) {
		result = func.apply(this, arguments);
	  }
	  return result;
	}
  },

  /**
   * @desc  保护代理、策略模式进行表单验证
   * @description 通过设计模式做表单验证
   * @param （函数）
   * @time 2019-03-25
   */

  Validator: Validator
}
