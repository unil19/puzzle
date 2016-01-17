function $(selector, content) { //封装获取元素的函数$
	var firstChar = selector.charAt(0);
	var obj = content || document;
	if (firstChar == "#") {
		return document.getElementById(selector.slice(1));
	}else if (firstChar == ".") {
		var allElement=obj.getElementsByTagName("*");//获取所有元素
		var arr=[]//定义返回数组
		for(var i=0; i<allElement.length;i++){//循环所有元素
			var className=allElement[i].className;
			arrClass=className.split(" ");
			for(var j=0; j<arrClass.length;j++){
				if(arrClass[j]==selector.slice(1)){
					arr.push(allElement[i]);
					break;
				}
			}
		}
		return arr;
	} else {
		return obj.getElementsByTagName(selector);
	};
};

function getStyle(obj, property) { //封装获取元素style函数
	if (window.getComputedStyle) {
		return getComputedStyle(obj)[property];
	} else {
		return obj.currentStyle[property];
	};
};

function doMove(obj, attr, speed, target, time, callBack) {//封装运动函数。参数有对象名，属性名，单位运动长度px,运动间隔时间，回调函数
	if(obj.timer) return;//如果对象有定时器，函数不执行；如果定时器为null、undefined等，运行函数
	var attrValue = parseFloat(getStyle(obj, attr)) || 0;//获取函数属性值，如果该属性值未定义，则默认其值为0
	speed = (target >= attrValue) ? Math.abs(speed) : -Math.abs(speed);//目标比当前值大，单位运动长度为正值，否则为负
	obj.timer = setInterval(function() {//为对象添加定时器
		attrValue += speed;//属性值加上单位运动长度
		if(Math.abs(target-attrValue)<=Math.abs(speed)){//当属性值与目标值差值<=单位运动长度时
			attrValue=target;//设置属性值为目标值
			clearInterval(obj.timer);//定时器停止运行
			obj.timer=null;//设置定时器为空对象
			obj.style[attr] = attrValue+"px";//设置对象属性值
			(typeof callBack=="function")&&callBack();//如果回调函数存在，则运行回调函数
		}else{
			obj.style[attr] = attrValue+"px";;//否则，直接运行回调函数
		}
	}, time);
};
function doMoveMore(obj, arr, time, callBack) {
	if(obj.timer) return;
	var attrValue=[],speed=[],target=[];
	for (var i = 0; i < arr.length; i++) {
		attrValue.push(parseFloat(getStyle(obj, arr[i].attr)) || 0);
		speed.push((arr[i].target >= attrValue[i]) ? Math.abs(arr[i].speed) : -Math.abs(arr[i].speed));
		target.push(arr[i].target);
	};
	obj.timer = setInterval(function() {
		var m=1;
		for (var i = 0; i < attrValue.length; i++) {
			attrValue[i]+=speed[i];
			if(Math.floor(Math.abs(target[i]-attrValue[i]))<=Math.ceil(Math.abs(speed[i]))){
				attrValue[i]=target[i];//设置属性值为目标值
				obj.style[arr[i].attr] = attrValue[i]+"px";//设置对象属性值
			}else{
				obj.style[arr[i].attr] = attrValue[i]+"px";;//否则，直接运行回调函数
			};
		};
		for (var i = 0; i < attrValue.length; i++) {
			if(obj.style[arr[i].attr]==(target[i]+"px")){
				m*=1;
			}else{
				m*=0;
			}
		};
		if(m==1){
			clearInterval(obj.timer);//定时器停止运行
			obj.timer=null;//设置定时器为空对象
			(typeof callBack=="function")&&callBack();
		};
	}, time);
};
function doMoveIntime(obj, arr, time, totalTime,callBack) {
	if(obj.timer) return;
	var attrValue=[],speed=[],target=[];
	for (var i = 0; i < arr.length; i++) {
		attrValue.push(parseFloat(getStyle(obj, arr[i].attr))||0);
		var speeds=Math.abs((arr[i].target-attrValue[i])*time/totalTime);
		speed.push((arr[i].target >= attrValue[i]) ?speeds : -speeds);
		target.push(arr[i].target);
	};
	obj.timer = setInterval(function() {
		var m=1;
		for (var i = 0; i < attrValue.length; i++) {
			attrValue[i]=attrValue[i]+speed[i];
			// console.log(attrValue[i],target[i],speed[i])
			if(Math.floor(Math.abs(target[i]-attrValue[i]))<=Math.ceil(Math.abs(speed[i]))){
				attrValue[i]=target[i];//设置属性值为目标值
				obj.style[arr[i].attr] = attrValue[i]+"px";//设置对象属性值
			}else{
				obj.style[arr[i].attr] = attrValue[i]+"px";;//否则，直接运行回调函数
			};
		};
		for (var i = 0; i < attrValue.length; i++) {
			if(obj.style[arr[i].attr]==(target[i]+"px")){
				m*=1;
			}else{
				m*=0;
			}
		};
		if(m==1){
			clearInterval(obj.timer);//定时器停止运行
			obj.timer=null;//设置定时器为空对象
			(typeof callBack=="function")&&callBack();
		};
	}, time);
};
function doMoveF(obj, attr, speed, target, time, callBack) {//封装运动函数。参数有对象名，属性名，单位运动长度px,运动间隔时间，回调函数
	if(obj.timer) return;//如果对象有定时器，函数不执行；如果定时器为null、undefined等，运行函数
	var attrValue = parseFloat(getStyle(obj, attr)) || 0;//获取函数属性值，如果该属性值未定义，则默认其值为0
	speed = (target >= attrValue) ? Math.abs(speed) : -Math.abs(speed);//目标比当前值大，单位运动长度为正值，否则为负值
	F();
	function F(){
		obj.timer = setTimeout(function() {//为对象添加定时器
			attrValue += speed;//属性值加上单位运动长度
			if(Math.abs(target-attrValue)<=Math.abs(speed)){//当属性值与目标值差值<=单位运动长度时
				attrValue=target;//设置属性值为目标值
				clearTimeout(obj.timer);//定时器停止运行
				obj.timer=null;//设置定时器为空对象
				obj.style[attr] = attrValue+"px";//设置对象属性值
				(typeof callBack=="function")&&callBack();//如果回调函数存在，则运行回调函数
			}else{
				obj.style[attr] = attrValue+"px";//否则，直接设置属性值
				F();
			}
			console.log(obj.timer);
		}, time);
	};
};
function shake(obj,attr,range,callBack){
	if(obj.timerShake) return;
	var arr=[];
	for(var i=range; i>0;i-=2){
		arr.push(-i,i);
	}
	arr.push(0);
	var n=0
	var l=parseFloat(getStyle(obj,attr));
	obj.timerShake=setInterval(function(){
		obj.style[attr]=l+arr[n]+"px";
		n++;
		if(n==arr.length){
			clearInterval(obj.timerShake);
			obj.timerShake=null;
			if(typeof callBack === "function"){
				callBack();
			}
		}
	},30)
};
function getTimeFixed(obj){
	var d= new Date;
	var Y=d.getFullYear();
	var M=d.getMonth()+1;
	var D=d.getDate();
	var W=d.getDay();
	var Week=["日","一","二","三","四","五","六"];
	var H=d.getHours();
	var Min=d.getMinutes();
	var S=d.getSeconds();
	obj.innerHTML=Y+"年"+addZero(M)+"月"+addZero(D)+"日 星期"+Week[W]+" "+addZero(H)+":"+addZero(Min)+":"+addZero(S);
};
function getTimeNow(){
	var d= new Date;
	var Y=d.getFullYear();
	var M=d.getMonth()+1;
	var D=d.getDate();
	var W=d.getDay();
	var Week=["日","一","二","三","四","五","六"];
	var H=d.getHours();
	var Min=d.getMinutes();
	var S=d.getSeconds();
	var now={Y:Y,M:addZero(M),D:addZero(D),W:W,Week:Week,H:addZero(H),Min:addZero(Min),S:addZero(S)};
	return now;
};
function addZero(x){
	if(x<10){
		return "0"+x;
	}else{
		return x;
	};
};
function timeReduce(x){
	var now=new Date();
	var future=new Date(x);
	var reduce=(future.getTime()-now.getTime())/1000;
	console.log(reduce);
	var day=Math.floor(reduce/86400);
	var hour=Math.floor(reduce%86400/3600);
	var min=Math.floor(reduce%86400%3600/60);
	var sec=Math.floor(reduce%60);
	var dms={
		D:addZero(day),
		H:addZero(hour),
		M:addZero(min),
		S:addZero(sec),
		onOff:true
	};
	if(reduce<=0){
		dms.onOff=false;
	}
	return dms;
};
function timeAdd(ago){
	var now=new Date();
	var add=(now.getTime()-ago.getTime())/1000;
	var msec=Math.floor((now.getTime()-ago.getTime())%1000/10);
	var day=Math.floor(add/86400);
	var hour=Math.floor(add%86400/3600);
	var min=Math.floor(add%86400%3600/60);
	var sec=Math.floor(add%60);
	var dms={
		D:addZero(day),
		H:addZero(hour),
		M:addZero(min),
		S:addZero(sec),
		MS:addZero(msec)
	};
	return dms;
};
function first(element){
	var firstElement = element.firstElementChild || element.firstChild;
	if( !firstElement || firstElement.nodeType !== 1 ){
		return null
	}else{
		return firstElement;
	}
};
function last(element){
	var lastElement = element.lastElementChild || element.lastChild;
	if( !lastElement || lastElement.nodeType !== 1 ){
		return null
	}else{
		return lastElement;
	}
}
function next(element){
	var nextElement = element.nextElementSibling || element.nextSibling;
	if( !nextElement || nextElement.nodeType !== 1 ){
		return null
	}else{
		return nextElement;
	}
};
function prev(element){
	var prevElement = element.previousElementSibling || element.previousSibling;
	if( !prevElement || prevElement.nodeType !== 1 ){
		return null
	}else{
		return prevElement;
	}
}
function hit(obj1,obj2){
	var aL1=obj1.offsetLeft;
	var aL2=obj1.offsetLeft+obj1.offsetWidth;
	var aT1=obj1.offsetTop;
	var aT2=obj1.offsetTop+obj1.offsetHeight;
	var bL1=obj2.offsetLeft
	var bL2=obj2.offsetLeft+obj2.offsetWidth;
	var bT1=obj2.offsetTop;
	var bT2=obj2.offsetTop+obj2.offsetHeight;
	if(aL2<bL1||aL1>bL2||aT2<bT1||aT1>bT2){
		return false;
	}else{
		return true;
	}
}