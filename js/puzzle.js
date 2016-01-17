window.onload=function(){
	puzzle.innit();
}
var puzzle={};
puzzle.innit=function(){//页面初始化函数
	puzzle.elementInnit();
	puzzle.dataInnit();
	puzzle.render(puzzle.difficult[puzzle.diffSele],puzzle.picture[puzzle.picSele],puzzle.mode);
	puzzle.event();
}
puzzle.elementInnit=function(){
	puzzle.oWrap=$(".wrap")[0];
	puzzle.oBox=$("#box");
	puzzle.aInp=$("input",$("buttonArea")[0]);
	puzzle.oImg=$("img",$("buttonArea")[0])[0];
	puzzle.oBg=$(".bg")[0];
	puzzle.aAle=$("li",$(".alert")[0]);
	puzzle.oTime=$(".timeadd")[0];
	puzzle.aDiv=$("div",puzzle.oBox);
}
puzzle.dataInnit=function(){
	puzzle.mode=0;
	puzzle.picSele=0;
	puzzle.diffSele=0;
	puzzle.position=[];
	puzzle.positionCorrect=[];
	puzzle.HMS=[];
	puzzle.picture=["./img/beauty.jpg","./img/world.jpg","./img/girl.jpg","./img/mona.jpg","./img/fly.jpg","./img/dog.jpg"];
	puzzle.difficult=[3,4,5,10];
}
puzzle.render=function(num,pic,mode){
	puzzle.position=[];
	puzzle.positionCorrect=[];
	puzzle.oBox.innerHTML="";
	puzzle.oImg.src=pic;
	for(i=0;i<num*num;i++){//加载
		var le=i%num;
		var wid=600/num;
		var to=Math.floor(i/num);
		var newDiv=document.createElement("div");
		puzzle.oWrap.style.height=document.documentElement.clientHeight+"px";
		puzzle.oBox.style.width=600+2*(num-1)+"px";
		puzzle.oBox.style.height=600+2*(num-1)+"px";
		newDiv.style.width=wid+"px";
		newDiv.style.height=wid+"px";
		if(mode==0){
			newDiv.style.background="url("+pic+") "+(-le*wid)+"px "+(-to*wid)+"px";
		}else{
			if(i!=(num*num-1)){
				newDiv.style.background="url("+pic+") "+(-le*wid)+"px "+(-to*wid)+"px";
			}else{
				newDiv.className="black";
			};
		};
		newDiv.style.left=le*(wid+2)+"px";
		newDiv.style.top=to*(wid+2)+"px";
		puzzle.position.push({left:le*(wid+2),top:to*(wid+2)});
		puzzle.positionCorrect.push({left:le*(wid+2),top:to*(wid+2)});
		puzzle.oBox.appendChild(newDiv);
		puzzle.oBla=$(".black")[0];
	};
}
puzzle.event=function(num,pic,mode){
	puzzle.aInp[0].onclick=function(){//点击模式选择
		puzzle.oBg.className="bg show";
		puzzle.aAle[1].className="show";
		var oP=$("p",puzzle.aAle[1])[0];
		oP.onclick=function(){
			puzzle.oBg.className="bg";
			puzzle.aAle[1].className="";
		};
		var aIn=$("input",puzzle.aAle[1]);
		for (var i = 0; i < aIn.length; i++) {
			aIn[i].index=i;
			aIn[i].onclick=function(){
				puzzle.oBg.className="bg";
				puzzle.aAle[1].className="";
				puzzle.mode=this.index;
				puzzle.render(puzzle.difficult[puzzle.diffSele],puzzle.picture[puzzle.picSele],puzzle.mode);
			};
		};
	}
	puzzle.aInp[1].onclick=function(){//点击难度选择
		puzzle.oBg.className="bg show";
		puzzle.aAle[0].className="show";
		var oP=$("p",puzzle.aAle[0])[0];
		oP.onclick=function(){
			puzzle.oBg.className="bg";
			puzzle.aAle[0].className="";
		}
		var aIn=$("input",puzzle.aAle[0]);
		for (var i = 0; i < aIn.length; i++) {
			aIn[i].index=i;
			aIn[i].onclick=function(){
				puzzle.oBg.className="bg";
				puzzle.aAle[0].className="";
				puzzle.diffSele=this.index;
				puzzle.render(puzzle.difficult[puzzle.diffSele],puzzle.picture[puzzle.picSele],puzzle.mode);
			};
		};
	};
	puzzle.aInp[2].onclick=function(){//点击上一张
		puzzle.picSele=((puzzle.picSele-1)>=0)?(puzzle.picSele-1)%puzzle.picture.length:puzzle.picture.length-1;
		puzzle.render(puzzle.difficult[puzzle.diffSele],puzzle.picture[puzzle.picSele],puzzle.mode);
	};
	puzzle.aInp[3].onclick=function(){//点击下一张
		puzzle.picSele=(puzzle.picSele+1)%puzzle.picture.length;
		puzzle.render(puzzle.difficult[puzzle.diffSele],puzzle.picture[puzzle.picSele],puzzle.mode);
	};
	puzzle.aInp[4].onclick=function(){//点击开始游戏
		puzzle.startInit();
		puzzle.gameStart();
		puzzle.divEvent();
	};
	puzzle.aInp[5].onclick=function(){
		clearInterval(puzzle.oWrap.timerA);
		puzzle.render(puzzle.difficult[puzzle.diffSele],puzzle.picture[puzzle.picSele],puzzle.mode);
		puzzle.overInit();
	}
	puzzle.aInp[6].onclick=function(){
		puzzle.aInp[6].className="dis";
		puzzle.aInp[7].className="show";
		puzzle.oImg.style.opacity=1;
	}
	puzzle.aInp[7].onclick=function(){
		puzzle.aInp[6].className="";
		puzzle.aInp[7].className="dispear";
		puzzle.oImg.style.opacity=0;
	}
}
puzzle.divEvent=function(){
	if(puzzle.mode==0){
		for(i=0;i<puzzle.aDiv.length;i++){
			puzzle.aDiv[i].index=i;
			puzzle.aDiv[i].onclick=null;
			puzzle.drag(puzzle.aDiv[i]);
		};
	};
	if(puzzle.mode==1){
		for(i=0;i<puzzle.aDiv.length;i++){
			puzzle.aDiv[i].index=i;
			puzzle.aDiv[i].onmousedown=null;
			puzzle.cli(puzzle.aDiv[i]);
		};
	};
}
puzzle.drag=function(element){
	element.onmousedown=function(ev){
		for (var i = 0; i < puzzle.aDiv.length; i++) {
			if(puzzle.aDiv[i].timer) return;
		};
		var closeObj;
		var hitArr;
		if(element.setCapture){
			element.setCapture();
		}
		element.style.zIndex=10;
		e=ev||event;
		var x=e.clientX-element.offsetLeft;
		var y=e.clientY-element.offsetTop;
		document.onmousemove=function(ev){
			hitArr=[];
			closeObj=null;
			var min=Infinity;
			e2=ev||event;
			var l=e2.clientX-x;
			var t=e2.clientY-y;
			if(l<0){
				l=0;
			}
			if(l>puzzle.oBox.clientWidth-element.offsetWidth){
				l=puzzle.oBox.clientWidth-element.offsetWidth;
			}
			if(t<0){
				t=0;
			}
			if(t>puzzle.oBox.clientHeight-element.offsetHeight){
				t=puzzle.oBox.clientHeight-element.offsetHeight;
			}
			element.style.left=l+"px";
			element.style.top=t+"px";
			for (var i = 0; i < puzzle.aDiv.length; i++) {
				if(element!==puzzle.aDiv[i]){
					puzzle.aDiv[i].className="";
					puzzle.aDiv[i].style.left=puzzle.position[i].left+"px";
					puzzle.aDiv[i].style.top=puzzle.position[i].top+"px";
					if(hit(element,puzzle.aDiv[i])){
						hitArr.push(puzzle.aDiv[i]);
					};
				};
			};
			for (var j = 0; j < hitArr.length; j++) {
				var left =hitArr[j].offsetLeft - l;
				var top =hitArr[j].offsetTop - t;
				var distance=Math.sqrt( left*left + top*top );
				 if(distance<min){
				 	min=distance;
				 	closeObj=hitArr[j];
				 };
			};
			if(closeObj){
				closeObj.className="active";
				closeObj.style.left=closeObj.offsetLeft-2+"px";
				closeObj.style.top=closeObj.offsetTop-2+"px";
			}
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			if(closeObj){
				closeObj.style.zIndex=10;
				closeObj.className="none";
				puzzle.position[closeObj.index]=[puzzle.position[element.index],puzzle.position[element.index]=puzzle.position[closeObj.index]][0];
				doMoveIntime(closeObj,[{attr:"left",target:puzzle.position[closeObj.index].left},{attr:"top",target:puzzle.position[closeObj.index].top}],30,400,callBack);
			}
			doMoveIntime(element,[{attr:"left",target:puzzle.position[element.index].left},{attr:"top",target:puzzle.position[element.index].top}],30,300);
			function callBack(){
				element.style.zIndex=2;
				closeObj.style.zIndex=2;
				for (var i = 0; i < puzzle.position.length; i++) {
					if(puzzle.position[i].left!=puzzle.positionCorrect[i].left||puzzle.position[i].top!=puzzle.positionCorrect[i].top) return;
				};
				clearInterval(puzzle.oWrap.timerA);
				var oTotalTime=$(".totalTime",puzzle.aAle[3])[0];
				oTotalTime.innerHTML=puzzle.oTime.innerHTML+"秒";
				puzzle.oBg.className="bg show";
				puzzle.aAle[2].className="show";
				var aIn=$("input",puzzle.aAle[2]);
				aIn[0].onclick=function(){
					puzzle.overInit();
					puzzle.startInit();
					puzzle.gameStart();
				};
				aIn[1].onclick=function(){
					puzzle.overInit();
				};
			}
			if(element.releaseCapture){
				element.releaseCapture();
			};
		};
		return false;
	};
}
puzzle.cli=function(element){
	element.onclick=function(){
		for (var i = 0; i < puzzle.aDiv.length; i++) {
			if(puzzle.aDiv[i].timer) return
		};
		if(((element.offsetLeft==puzzle.oBla.offsetLeft)&&(Math.abs(element.offsetTop-puzzle.oBla.offsetTop)==(element.clientWidth+2)))||((element.offsetTop==puzzle.oBla.offsetTop)&&(Math.abs(element.offsetLeft-puzzle.oBla.offsetLeft)==(element.clientHeight+2)))){
			puzzle.position[puzzle.oBla.index]=[puzzle.position[element.index],puzzle.position[element.index]=puzzle.position[puzzle.oBla.index]][0];
			doMoveIntime(puzzle.oBla,[{attr:"left",target:puzzle.position[puzzle.oBla.index].left},{attr:"top",target:puzzle.position[puzzle.oBla.index].top}],30,200);
			doMoveIntime(element,[{attr:"left",target:puzzle.position[element.index].left},{attr:"top",target:puzzle.position[element.index].top}],30,200,callBack);
		}
		function callBack(){
			for (var i = 0; i < puzzle.position.length; i++) {
				if(puzzle.position[i].left!=puzzle.positionCorrect[i].left||puzzle.position[i].top!=puzzle.positionCorrect[i].top) return;
			};
			clearInterval(puzzle.oWrap.timerA);
			var oTotalTime=$(".totalTime",puzzle.aAle[3])[0];
			oTotalTime.innerHTML=puzzle.oTime.innerHTML+"秒";
			puzzle.oBg.className="bg show";
			puzzle.aAle[2].className="show";
			var aIn=$("input",puzzle.aAle[2]);
			aIn[0].onclick=function(){
				puzzle.overInit();
				puzzle.startInit();
				puzzle.gameStart();
			};
			aIn[1].onclick=function(){
				puzzle.overInit();
			};
		};
	};
}
puzzle.startInit=function(){
	for (var i = 0; i < 5; i++) {
		puzzle.aInp[i].className="dis";
		puzzle.aInp[i].disabled=true;
	};
	puzzle.aInp[5].className="";
	puzzle.aInp[5].disabled=false;
}
puzzle.gameStart=function(){
	puzzle.order();
	var ago=new Date();
	puzzle.oWrap.timerA=setInterval(function(){
		puzzle.HMS=timeAdd(ago);
		puzzle.oTime.innerHTML=puzzle.HMS.H+":"+puzzle.HMS.M+":"+puzzle.HMS.S+"."+puzzle.HMS.MS;
	},10);
};
puzzle.overInit=function(){
	puzzle.oTime.innerHTML="00:00:00";
	puzzle.oBg.className="bg";
	puzzle.aAle[2].className="";
	for (var i = 0; i < 5; i++) {
		puzzle.aInp[i].className="";
		puzzle.aInp[i].disabled=false;
	};
	puzzle.aInp[5].className="dis";
	puzzle.aInp[5].disabled=true;
}
puzzle.order=function(){
	if(puzzle.mode==0){
		puzzle.position.sort(function(){
			return Math.random()-0.5;
		});
	}
	if(puzzle.mode==1){
		var newD=[];
		var m=0
		for (var i = 0; i < puzzle.aDiv.length-1; i++) {
			newD.push(i);
		};
		newD.sort(function(){
			return Math.random()-0.5;
		});
		for (var i = 1; i < newD.length; i++) {//计算矩阵逆序数
			for (var j = 0; j < i; j++) {
				if(newD[j]>newD[i]){
					m++;
				};
			};
		}
		if(m%2==0){
			for (var i = 0; i < puzzle.position.length-1; i++) {
				puzzle.position[i]=puzzle.positionCorrect[newD[i]];
			};
		}else{
			puzzle.order();
		}
	}
	for(var i=0;i<puzzle.aDiv.length;i++){//加载
		doMoveIntime(puzzle.aDiv[i],[{attr:"left",target:puzzle.position[i].left},{attr:"top",target:puzzle.position[i].top}],30,600);
	};
}