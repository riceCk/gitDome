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
  }
}
