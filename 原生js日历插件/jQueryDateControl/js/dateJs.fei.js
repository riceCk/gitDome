var date = new Date(); //创建日期对象
var nowYear = date.getFullYear(); //获取当前年份
var nowMonth = date.getMonth() + 1; //获取当前月份
var nowDay = date.getDate(); //获取当前天
var splitString = "-"; //年月日之间的分隔符
var weekDays = ["日", "一", "二", "三", "四", "五", "六"] //星期数组
var months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"] //月份数组
var lastDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //每个月的最后一天是几号
var dataLists = [
	{
        data1: '2018-11-13',
        data2: '2018-11-29',
        title: '晴天'
	},
    {
        data1: '2018-11-15',
        data2: '2018-11-17',
        title: '暴晒'
    },
    {
        data1: '2018-11-10',
        data2: '2018-11-15',
        title: '龙卷风'
    },
]
let colorNode = ['green', 'red', 'yellow']
let node = []
let colorIndex = 0;

if (colorIndex > 3) {
	colorIndex = 0
}

//变量保存，存储当前选择的年月
var checkYear = nowYear;
var checkMonth = nowMonth;

//将选择的日期添加到输入框
// 日期点击事件
function setInput(selectDay){
	console.log(checkYear, checkMonth, selectDay)
}

//显示控件
// 传值，当前时间
function showDate() {
	createDate(nowYear, nowMonth);//创建日历
	//计算显示控件位置
}

/*
 * 以下拼接日历框
 * 并定位日历框
 * */
function createDate(thisYear, thisMonth) {
	var createDoc = '<div style="height: 30px;">';
	//当前年月日，点击此处日历自动跳到当前日期
	createDoc += '<p style="width: 100%;height: 30px;text-align: center;color: #999;cursor: pointer" onclick="getThisDay()">当前日期 ' + nowYear + "年" + nowMonth + "月" + nowDay + "号";
	//关闭日历显示
	createDoc += '<span id="closeDate" onClick="hidDate()" style="float: right;font-size: 25px;margin: -20px 3px 0 0;cursor: pointer;">×</span></p></div>';
	//上一月
	createDoc += '<div style="margin-bottom: 8px;">';
	createDoc += '<span id="lastMonth" onclick="lastMonthClick()" style="margin: 0 20px 0 25px;cursor:pointer;"><</span>';
	//创建年份下拉框[1900-2099]年
	createDoc += '<select id ="selectYear" class="selectStyle" onchange="changeYearAndMonth()">';
	for(var i = 1900; i <= 2099; i++) {
		createDoc += "<option value=" + i + ">" + i + "</option>";
	}
	createDoc += "</select>年";
	//创建月份下拉框
	createDoc += '<select id ="selectMonth" class="selectStyle" onchange="changeYearAndMonth()">';
	for(var i = 1; i <= 12; i++) {
		createDoc += "<option value=" + i + ">" + i + "</option>";
	}
	createDoc += "</select>月";
	//下一月
	createDoc += '<span id="nextMonth" onClick="nextMonthClick()" style="float: right;margin-right: 25px;cursor:pointer;">></span></div>';
	//创建星期
	createDoc += '<div class="everyWeekDay">';
	for(var i = 0; i < weekDays.length; i++) {
		if(weekDays[i] == "日" || weekDays[i] == "六") {
			createDoc += '<span class="weekday" style="color:red;">' + weekDays[i] + '</span>'
		} else {
			createDoc += '<span class="weekday">' + weekDays[i] + '</span>'
		}
	}
	createDoc += '</div>';
	//创建每月天数
	createDoc += '<div class="everyDay"><div class="marginTop">'; //日期样式DIV
	var thisWeek = getThisWeekDay(thisYear, thisMonth, 1); //算出当前 年月1号是星期几
	/*
	 * 如果当前不是星期天,创建空白日期占位
	 * 若是星期天，则循环输出当月天数
	 * 待修改优化，后期改为变色的前一个月日期
	 */
	var tail = getTailDay(thisYear, thisMonth - 1)
	if(thisWeek != 0) {
		for(var i = 0; i < thisWeek; i++) {
			let tailday = tail - thisWeek + 1 + i
			createDoc += `<span class="days" style="color: #eee"> ${tailday} </span>`;
		}
	}
	//循环输出当月天数
	//getThisMonthDay()获取当月天数
	for(var i = 1; i < getThisMonthDay(thisYear, thisMonth) + 1; i++) {
        let nodeTitleStart = specialNodeStart(thisYear, thisMonth, i)
        let nodeTitleEnt = specialNodeEnt(thisYear, thisMonth, i)
        if (nodeTitleStart) {
        	node.push(nodeTitleStart.split('、', 1).join(''))
        	if (nodeTitleEnt) {
                createDoc+=`<span id="weekends" onClick="setInput('+i+')"  style="background-color: ${colorNode[colorIndex++]}"  
									class="days special"  onmouseover="mouseoverNode(this);" 
									onmouseout="mouseoutNode(this)" >
								${i}
								<div class="special--text">
									节点开始：${nodeTitleStart}
									节点结束：${nodeTitleEnt}
								</div>
							</span>`;
			} else {
                createDoc+=`<span id="weekends" onClick="setInput('+i+')" 
							class="days special" style="background-color: ${colorNode[colorIndex++]}" onmouseover="mouseoverNode(this);" 
							onmouseout="mouseoutNode(this)" >
						${i}
						<div class="special--text">
									节点开始：${nodeTitleStart}
						</div>
						</span>`;
			}
        } else if (nodeTitleEnt) {
        	let colorStyle = colorNode[node.indexOf(nodeTitleEnt.split('、', 1).join(''))]
        	if (nodeTitleStart) {
                createDoc+=`<span id="weekends" onClick="setInput('+i+')" style="background-color: ${colorStyle}"
							class="days special"  onmouseover="mouseoverNode(this);" onmouseout="mouseoutNode(this)" >
						${i}
						<div class="special--text">
									节点开始：${nodeTitleStart}
									节点结束：${nodeTitleEnt}
								</div>
						</span>`;
			} else {
                createDoc+=`<span id="weekends"  onClick="setInput('+i+')" style="background-color: ${colorStyle}"
									class="days special" onmouseover="mouseoverNode(this);" onmouseout="mouseoutNode(this)" >
						${i}
						<div class="special--text">
									节点结束：${nodeTitleEnt}
								</div>
						</span>`;
			}
        } else if(thisYear==nowYear && thisMonth == nowMonth && i== nowDay){
			//今天的显示
			let nowadayText = nowadays(nowYear, nowMonth, nowDay)
            if(nowadays) {
                createDoc+=`<span id="weekends" onClick="setInput('+i+')" class="days special now" onmouseover="mouseoverNode(this);" onmouseout="mouseoutNode(this)" >
						${i}
						<div class="special--text">
									节点：${nowadayText}
						</div>
						</span>`;
			} else if(getThisWeekDay(thisYear,thisMonth,i) == 6 || getThisWeekDay(thisYear,thisMonth,i) == 0){
				//今天是周末
				createDoc+='<span onclick="setInput('+i+')" class="days now">'+i+'</span>';
			}else{  
		      	createDoc+='<span onClick="setInput('+i+')" class="days now">'+i+'</span>';
		    }  
		} else {
		     //周末变为红色
		    if(getThisWeekDay(thisYear,thisMonth,i)==6 || getThisWeekDay(thisYear,thisMonth,i)==0){  
	      		createDoc+='<span id="weekends" onClick="setInput('+i+')" class="days" onmouseover="mouseOver(this);" onmouseout="mouseOut(this)" style="color:red;cursor:pointer;">'+i+'</span>';
		    }else{
		     	createDoc+='<span onClick="setInput('+i+')" class="days" onmouseover="mouseOver(this);" onmouseout="mouseOut(this)" style="cursor:pointer;">'+i+'</span>';
		    }
	    }
		//星期六换行
	    if(getThisWeekDay(thisYear,thisMonth,i)==6){  
		     createDoc+="</tr>";  
	    }  
	}
	createDoc += '</div></div>';

	//将创建好的控件字符串添加到div中  
	document.getElementById('dateOuter').innerHTML = createDoc;
	//默认选择当前年份
	document.getElementById('selectYear').value = thisYear;  
	//默认选择当前月  
	document.getElementById('selectMonth').value = thisMonth;  
}//日历创建结束

//跳转到当前日
// 标题跳转
function getThisDay(){
	checkYear = nowYear;
	checkMonth = nowMonth;
	createDate(checkYear,checkMonth);
}  
//上一个月
function lastMonthClick(){
	//若当前是1月份，年份减一，月份变为12
	if(checkMonth == 1){
		checkYear = checkYear - 1;
		checkMonth = 12;
	}else{
		checkMonth = checkMonth - 1;
	}
	//创建当前月份日期
	createDate(checkYear,checkMonth);
}

//下一月
function nextMonthClick(){
	//若当前是12月份，年份加1，月份变为1
	if(checkMonth == 12){
		checkYear = checkYear + 1;
		checkMonth = 1;
	}else{
		checkMonth = checkMonth + 1;
	}
	//创建当前月份日期
	createDate(checkYear,checkMonth);
}

//年月下拉框  
function changeYearAndMonth(){  
	checkYear = document.getElementById('selectYear').value;  
	checkMonth = document.getElementById('selectMonth').value;  
	createDate(checkYear,checkMonth);  
} 

//判断是否为闰年 
function isLeapYear(year) {
	var isLeap = false;
	if(0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0))) {
		//闰年可以被4整除且不能被100整除，或者能整除400
		isLeap = true;
	}
	return isLeap;
}

//获取某月份的总天数
function getThisMonthDay(year, month) {
	var thisDayCount = lastDays[month - 1]; //获取当前月份的天数
	if((month == 2) && isLeapYear(year)) {
		//若当前月份为2月，并且是闰年，天数加1
		thisDayCount++;
	}
	return thisDayCount;
}

function getTailDay (year, month) {
	if (month + 1 === 1) {
        return getThisMonthDay(year - 1, 12)
	} else {
        return getThisMonthDay(year, month)
	}
}

//计算某天是星期几
function getThisWeekDay(year, month, date) {
	//将年月日创建Date对象，返回当前星期几
	var thisDate = new Date(year, month - 1, date);
	return thisDate.getDay();
}

//鼠标移进时
function mouseOver(obj){
	if(obj.id == "weekends"){
		//若为周末，边框样式为红色
		obj.style.border="1px solid red"; 
	}else{
		obj.style.border="1px solid #4eccc4";
	}
}
//鼠标移出时，边框恢复原色
function mouseOut(obj){
	obj.style.border="1px solid #F7F7F7";
}

function mouseoverNode (obj) {
	obj.getElementsByClassName('special--text')[0].style.display = 'block'
}
function mouseoutNode(obj){
    obj.getElementsByClassName('special--text')[0].style.display = 'none'
}

// 是否是特殊样式节点
function specialNodeStart (year, month, day) {
	let len = dataLists.length;
	let nodeText = '';
	for (let i = 0; i < len; i++ ){
        let str1 = dataLists[i].data1.split('-')
		if (year === +str1[0]) {
			if (month === +str1[1]) {
				if (day === +str1[2]) {
					nodeText +=  dataLists[i].title + '、'
				}
			}
		}
	}
	return nodeText
}

function specialNodeEnt (year, month, day) {
    let len = dataLists.length;
    let nodeText = '';
    for (let i = 0; i < len; i++ ){
        let str2 = dataLists[i].data2.split('-')
        if (year === +str2[0]) {
            if (month === +str2[1]) {
                if (day === +str2[2]) {
                    nodeText +=  dataLists[i].title + '、'
                }
            }
        }
    }
    return nodeText
}

// 判断节点显示区间与今天关系
function nowadays(year, month, day) {
    let len = dataLists.length;
    let nodeText = ''
	for (let i = 0; i < len; i++) {
        let data1 = dataLists[i].data1.split('-')
        let data2 = dataLists[i].data2.split('-')
		if(+data1[0] === year) {
			if(+data1[1] <= month && +data2[1] >= month) {
				if(+data1[2] <= day && +data2[2] >= day) {
                    nodeText += dataLists[i].title + '、'
				}
			}
		}
	}
	return nodeText
}

//关闭日期选择框
function hidDate(){
	document.getElementById('dateOuter').style.display = "none";
}

//控制键盘操作，左右控制月份，空格返回当前日期
document.onkeydown=function(e){
	/*
	 * 浏览器兼容性
	 * ie的document对象有一个all属性，它的里面存放了页面的所有标签，而其它浏览器是没有的，所以在ie中，事件对象的传播会绑定在全局的windows上，所以ie浏览器肯定是都支持window.event
	 * firefox只支持事件对象作为参数传入，而这又恰恰是ie6/ie7/ie8所无法实现的，所以可以成功的区分这两类
	 * ie9/chrome/opera/safari，则两种方式都支持
	 * var e = event?event||window.event可以保证各浏览器的兼容的
	 */
	var thisEvent = e || window.event;  
	var keyCode = thisEvent.keyCode || thisEvent.which;  
	//若控件是隐藏状态  
	if(document.getElementById('dateOuter').style.display == "none"){  
		return false;  
	}
	switch(keyCode){  
		case 32://空格，返回当前日期
		getThisDay();break;
		case 27://Esc，关闭日历插件
		hiddenCal();break;
		case 37://left，向左
		lastMonthClick();break;
		case 39://right，向右
		nextMonthClick();break;
	}
}

showDate()