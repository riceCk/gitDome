/**
 * 工具包
 * 2018-11-27
 * 陈凯
 */
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
    function add_zero (temp) {
      if(temp < 10) return '0' + temp
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
	getScrollOffset () {
    if(window.pageXOffset) {
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
	 * @time 2018-12-03
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
			function check (reg, data) {
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
			function checkPhone (data) {
				let reg = /^1(3|4|5|7|8)\d{9}$/
				return check(reg, data)
			}
			// 固定电话
			function checkTel (data) {
				let reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
				return check(reg, data)
			}
			// 邮箱
			function checkEmail (data) {
				let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
				return check(reg, data)
			}
			// QQ
			function checkQQ (data) {
				let reg = /^[1-9]\d{4,9}$/
				return check(reg, data)
			}
			// 车牌
			function checkCarNum (data) {
				let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$|^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
				return check(reg, data)
			}
			// 汉字
			function checkChinese (data) {
				let reg = /[\u4e00-\u9fa5]/
				return check(reg, data)
			}
			function checkName (data) {
				let reg = /(^[\u4E00-\u9FA5]{2,4}$)|(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$)/
				return check(reg, data)
			}
	}
}