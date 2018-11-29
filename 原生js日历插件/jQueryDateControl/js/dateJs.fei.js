let date = new Date() // 创建日期对象
let nowYear = date.getFullYear() // 获取当前年份
let nowMonth = date.getMonth() + 1 // 获取当前月份
let nowDay = date.getDate()// 获取当前天
let splitString = '-' //  年月日之间的分隔符
let weekDays = ['日', '一', '二', '三', '四', '五', '六'] // 星期数组
let months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] // 月份数组
let lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 每个月的最后一天是几号
let dataLists = [
	{
		nodeName: '大暴风',
		controlStartTime: '11-01',
		controlEndTime: '11-15'
	},
	{
		nodeName: '下雾',
		controlStartTime: '10-20',
		controlEndTime: '11-5'
	},
	{
		nodeName: '下雨',
		controlStartTime: '11-18',
		controlEndTime: '11-20'
	},
	{
		nodeName: '下冰雹',
		controlStartTime: '10-01',
		controlEndTime: '12-15'
	},
]
let colorIndex = 0

let colorNode = ['green', 'red', 'gray', 'orange', 'blue', 'purple']
dataLists.forEach((item) => {
		if (colorIndex > 5) {
				colorIndex = 0
		}
		item.color = colorNode[colorIndex++]
})
let node = []

// 变量保存，存储当前选择的年月
let checkYear = nowYear
let checkMonth = nowMonth

// 显示控件
// 传值，当前时间
function showDate () {
		createDate(nowYear, nowMonth) // 创建日历
		// 计算显示控件位置
}

/*
 * 以下拼接日历框
 * 并定位日历框
 * */
function createDate (thisYear, thisMonth) {
		var createDoc = '<div style="height: 30px;">'
		// 当前年月日，点击此处日历自动跳到当前日期
		createDoc += '<p style="width: 100%;height: 30px;text-align: center;color: #999;cursor: pointer" onclick="$specialFocusEventLogic.getThisDay()">当前日期 ' + nowYear + '年' + nowMonth + '月' + nowDay + '号'
		// 关闭日历显示
		createDoc += '<span id="closeDate" onClick="$specialFocusEventLogic.hidDate()" style="float: right;font-size: 25px;margin: -20px 3px 0 0;cursor: pointer;"></span></p></div>'
		// 上一月
		createDoc += '<div style="margin-bottom: 8px;display: flex">'
		createDoc += '<span id="lastMonth" onclick="$specialFocusEventLogic.lastMonthClick()" style="margin: 0 20px 0 25px;cursor:pointer;"><</span>'
		// 创建年份下拉框[1900-2099]年
		createDoc += '<div style="flex: 1;padding: 0 1.5rem"><label id ="selectYear" class="selectStyle">'
		createDoc += thisYear
		createDoc += '</label>年'
		// 创建月份下拉框
		createDoc += '<label id ="selectMonth" class="selectStyle">'
		createDoc +=  thisMonth
		createDoc += '</label>月</div>'
		// 下一月
		createDoc += '<span id="nextMonth" onClick="$specialFocusEventLogic.nextMonthClick()" style="float: right;margin-right: 25px;cursor:pointer;">></span></div>'
		// 创建星期
		createDoc += '<div class="everyWeekDay">'
		for (let i = 0; i < weekDays.length; i++) {
				if (weekDays[i] === '日' || weekDays[i] === '六') {
						createDoc += '<span class="weekday" style="color:red;">' + weekDays[i] + '</span>'
				} else {
						createDoc += '<span class="weekday">' + weekDays[i] + '</span>'
				}
		}
		createDoc += '</div>'
		// 创建每月天数
		createDoc += '<div class="everyDay"><div class="marginTop">' // 日期样式DIV
		var thisWeek = getThisWeekDay(thisYear, thisMonth, 1) // 算出当前 年月1号是星期几
		/*
		 * 如果当前不是星期天,创建空白日期占位
		 * 若是星期天，则循环输出当月天数
		 * 待修改优化，后期改为变色的前一个月日期
		 */
		var tail = getTailDay(thisYear, thisMonth - 1)
		if (thisWeek !== 0) {
				for (let i = 0; i < thisWeek; i++) {
						let tailday = tail - thisWeek + 1 + i
						createDoc += `<span class="days" onclick="$specialFocusEventLogic.lastMonthClick()" style="color: #eee"> ${tailday} </span>`
				}
		}
		// 循环输出当月天数
		// getThisMonthDay()获取当月天数
		for (let i = 1; i < getThisMonthDay(thisYear, thisMonth) + 1; i++) {
				let nodeTitleStart = specialNodeStart(thisYear, thisMonth, i)
				let nodeTitleStart1 = specialNodeStart1(thisYear, thisMonth, i)
				let nodeTitleEnt = specialNodeEnt(thisYear, thisMonth, i)
				let nodeTitleEnt1 = specialNodeEnt1(thisYear, thisMonth, i)
				if (+thisYear === +nowYear && +thisMonth === +nowMonth && i === +nowDay) {
						// 今天的显示
						let nowTitle = nowadays1(nowYear, nowMonth, nowDay)
						if (nowadays) {
								createDoc += `
									<span id="weekends" 
												onClick="$specialFocusEventLogic.setInput('+i+')" 
												class="days special now" 
												onmouseover="$specialFocusEventLogic.mouseoverNode(this);" 
												onmouseout="$specialFocusEventLogic.mouseoutNode(this)" >
												${i} ${nowTitle}
				</span>`
						} else if (+getThisWeekDay(thisYear, thisMonth, i) === 6 || +getThisWeekDay(thisYear, thisMonth, i) === 0) {
								// 今天是周末
								createDoc += '<span onclick="$specialFocusEventLogic.setInput(' + i + ')" class="days now">' + i + '</span>'
						} else {
								createDoc += '<span onClick="$specialFocusEventLogic.setInput(' + i + ')" class="days now">' + i + '</span>'
						}
				} else if (nodeTitleStart1) {
						createDoc += `<span id="weekends" 
																onClick="$specialFocusEventLogic.setInput('+i+')"  
																style="background-color: ${nodeTitleStart[1]}"  
																class="days special"  
																onmouseover="$specialFocusEventLogic.mouseoverNode(this);" 
																onmouseout="$specialFocusEventLogic.mouseoutNode(this)" >
																${i} ${nodeTitleStart1}
														</span>`
				} else if (nodeTitleEnt1) {
						createDoc += `<span id="weekends" 
																onClick="$specialFocusEventLogic.setInput('+i+')" 
																style="background-color: ${nodeTitleEnt[1]}"
																class="days special"  
																onmouseover="$specialFocusEventLogic.mouseoverNode(this);" 
																onmouseout="$specialFocusEventLogic.mouseoutNode(this)" >
																${i}${nodeTitleEnt1}
													</span>`
				} else {
						// 周末变为红色
						if (+getThisWeekDay(thisYear, thisMonth, i) === 6 || +getThisWeekDay(thisYear, thisMonth, i) === 0) {
								createDoc += '<span id="weekends" onClick="$specialFocusEventLogic.setInput(' + i + ')" class="days" onmouseover="$specialFocusEventLogic.mouseOver(this);" onmouseout="$specialFocusEventLogic.mouseOut(this)" style="color:red;cursor:pointer;">' + i + '</span>'
						} else {
								createDoc += '<span onClick="$specialFocusEventLogic.setInput(' + i + ')" class="days" onmouseover="$specialFocusEventLogic.mouseOver(this);" onmouseout="$specialFocusEventLogic.mouseOut(this)" style="cursor:pointer;">' + i + ' </span>'
						}
				}
				// 星期六换行
				if (+getThisWeekDay(thisYear, thisMonth, i) === 6) {
						createDoc += '</tr>'
				}
		}
		createDoc += '</div></div>'

		// 将创建好的控件字符串添加到div中
		document.getElementById('dateOuter').innerHTML = createDoc
		// 默认选择当前年份
		document.getElementById('selectYear').value = thisYear
		// 默认选择当前月
		document.getElementById('selectMonth').value = thisMonth
}// 日历创建结束

// 判断是否为闰年
function isLeapYear (year) {
		var isLeap = false
		if (+year === 0 % 4 && ((+year % 100 !== 0) || (year % 400 === 0))) {
				// 闰年可以被4整除且不能被100整除，或者能整除400
				isLeap = true
		}
		return isLeap
}

// 获取某月份的总天数
function getThisMonthDay (year, month) {
		var thisDayCount = lastDays[month - 1]  // 获取当前月份的天数
		if ((+month === 2) && isLeapYear(year)) {
				// 若当前月份为2月，并且是闰年，天数加1
				thisDayCount++
		}
		return thisDayCount
}

function getTailDay (year, month) {
		if (month + 1 === 1) {
				return getThisMonthDay(year - 1, 12)
		} else {
				return getThisMonthDay(year, month)
		}
}

// 计算某天是星期几
function getThisWeekDay (year, month, date) {
		// 将年月日创建Date对象，返回当前星期几
		var thisDate = new Date(year, month - 1, date)
		return thisDate.getDay()
}

let $window = window
// 鼠标移进时
$window.$specialFocusEventLogic = {
		 mouseOver (obj) {
				if (obj.id === 'weekends') {
						// 若为周末，边框样式为红色
						obj.style.border = '1px solid red'
				} else {
						obj.style.border = '1px solid #4eccc4'
				}
		},
		// 鼠标移出时，边框恢复原色
		 mouseOut (obj) {
				obj.style.border = '1px solid #F7F7F7'
		},
		// 鼠标移进时  特殊弹框节点
		 mouseoverNode (obj) {
				obj.getElementsByClassName('special--text')[0].style.display = 'block'
		},
		// 鼠标移除时  取消弹框节点
		 mouseoutNode (obj) {
				obj.getElementsByClassName('special--text')[0].style.display = 'none'
		},
		// 将选择的日期添加到输入框
		// 日期点击事件
		setInput (selectDay) {
		},
		changeYearAndMonth () {
				checkYear = document.getElementById('selectYear').value
				checkMonth = document.getElementById('selectMonth').value
				createDate(checkYear, checkMonth)
		},
		getThisDay () {
				checkYear = nowYear
				checkMonth = nowMonth
				createDate(checkYear, checkMonth)
		},
		hidDate () {
				document.getElementById('dateOuter').style.display = 'none'
		},
		// 跳转到当前日
		// 标题跳转
		// 上一个月
		lastMonthClick () {
		// 若当前是1月份，年份减一，月份变为12
		if (checkMonth === 1) {
				checkYear = checkYear - 1
				checkMonth = 12
		} else {
				checkMonth = checkMonth - 1
		}
		// 创建当前月份日期
		createDate(checkYear, checkMonth)
},
		// 下一月
		nextMonthClick () {
		// 若当前是12月份，年份加1，月份变为1
		if (checkMonth === 12) {
				checkYear = checkYear + 1
				checkMonth = 1
		} else {
				checkMonth = checkMonth + 1
		}
		// 创建当前月份日期
		createDate(checkYear, checkMonth)
}
}

// 是否是特殊样式节点
function specialNodeStart (year, month, day) {
		let len = dataLists.length
		let nodeText = ''
		let nodeColor = ''
		for (let i = 0; i < len; i++) {
				let str1 = dataLists[i].controlStartTime.split('-')
				if (month === +str1[0]) {
						if (day === +str1[1]) {
								nodeText +=  dataLists[i].nodeName + '、'
								nodeColor = dataLists[i].color
						}
				}
		}
		let nodeStart = [nodeText, nodeColor]
		return nodeStart
}
// 是否是特殊样式节点
function specialNodeStart1 (year, month, day) {
		let len = dataLists.length
		let bulletBoxDate = []
		for (let i = 0; i < len; i++) {
				let str1 = dataLists[i].controlStartTime.split('-')
				if (month === +str1[0]) {
						if (day === +str1[1]) {
								bulletBoxDate.push(dataLists[i])
						}
				}
		}
		return getBullteDom(bulletBoxDate, day)
}
function specialNodeEnt (year, month, day) {
		let len = dataLists.length
		let nodeText = ''
		let nodeColor = ''
		for (let i = 0; i < len; i++) {
				let str2 = dataLists[i].controlEndTime.split('-')
						if (month === +str2[0]) {
								if (day === +str2[1]) {
										nodeText +=  dataLists[i].nodeName + '、'
										nodeColor = dataLists[i].color
								}
						}
		}
		let nodeStart = [nodeText, nodeColor]
		return nodeStart
}
function specialNodeEnt1 (year, month, day) {
		let len = dataLists.length
		let bulletBoxDate = []
		for (let i = 0; i < len; i++) {
				let str2 = dataLists[i].controlEndTime.split('-')
				if (month === +str2[0]) {
						if (day === +str2[1]) {
								bulletBoxDate.push(dataLists[i])
						}
				}
		}
		return getBullteDom(bulletBoxDate, day)
}
function nowadays1 (year, month, day) {
		let len = dataLists.length
		let bulletBoxDate = []
		for (let i = 0; i < len; i++) {
				let data1 = dataLists[i].controlStartTime.split('-')
				let data2 = dataLists[i].controlEndTime.split('-')
				if (+data1[0] < month && +data2[0] > month) {
						bulletBoxDate.push(dataLists[i])
				} else if (+data1[0] === month) {
						if (+data1[1] <= day && +data2[1] >= day) {
								bulletBoxDate.push(dataLists[i])
						}
				}
		}
		return getBullteDom(bulletBoxDate, day)
}

function getBullteDom (domDate, i) {
		let domHtml = ''
		domDate.forEach(item => {
				domHtml += `<div class="special-list">
														<div class="list"><h5>节点名称：</h5><span>${item.nodeName}</span></div>
														<div class="list"><h5>节点开始时间：</h5><span>${item.controlStartTime}</span></div>
														<div class="list"><h5>节点结束时间：</h5><span>${item.controlEndTime}</span></div>
										</div>`
		})
		if (domHtml) {
				domHtml = `<div class="special--text">
				 ${domHtml}
				 </div>`
		}
		return domHtml
}

// 判断节点显示区间与今天关系
function nowadays (year, month, day) {
		let len = dataLists.length
		let nodeText = ''
		for (let i = 0; i < len; i++) {
				let data1 = dataLists[i].controlStartTime.split('-')
				let data2 = dataLists[i].controlEndTime.split('-')
				if (+data1[0] < month && +data2[0] > month) {
						nodeText += dataLists[i].nodeName + '、'
				} else if (+data1[0] === month) {
						if (+data1[1] <= day && +data2[1] >= day) {
								nodeText += dataLists[i].nodeName + '、'
						}
				}
		}
		return nodeText
}

showDate()