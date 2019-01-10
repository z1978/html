// ==UserScript==
// @name        zacGetHtml
// @namespace
// @description zacGetHtml
// @includes    *
// @excludes
// @match       *://www.yahoo.co.jp/*
// ==/UserScript==

var new_element_N = document.createElement("style");
new_element_N.innerHTML = '#drager {' + '   position: fixed;' + '   width: 35px;' + '   height: 35px;' + '   background-color: rgba(0, 0, 0, 0.2);' + '   z-index: 10000;' + '   cursor: pointer;' + '   top: 0px;' + '   left: 0px;' + '   border-radius: 30%;' + '   padding: 6px;' + ' }' + ' ' + ' #drager>div {' + '   border-radius: 50%;' + '   width: 100%;' + '   height: 100%;' + '   background-color: rgba(0, 0, 0, 0.3);' + '   transition: all 0.2s;' + '  -webkit-transition: all 0.2s;' + '  -moz-transition: all 0.2s;' + '  -o-transition: all 0.2s;' + ' }' + ' #drager:hover>div{' + '   background-color: rgba(0, 0, 0, 0.6);' + ' } ';
document.body.appendChild(new_element_N);
new_element_N = document.createElement('div');
new_element_N.setAttribute("id", "drager");
new_element_N.style.top = "100px";
new_element_N.style.left = "100px";
new_element_N.innerHTML = ' <div></div>';
document.body.appendChild(new_element_N);
//
//
var posX;
var posY;
var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var fdiv = document.getElementById("drager");
fdiv.onmousedown = function (e) {
  screenWidth = document.documentElement.clientWidth;
  screenHeight = document.documentElement.clientHeight;
  if (!e) {
    e = window.event;
  } //IE
  posX = e.clientX - parseInt(fdiv.style.left);
  posY = e.clientY - parseInt(fdiv.style.top);
  document.onmousemove = mousemove;
}
document.onmouseup = function () //释放时自动贴到最近位置
{
  console.log("debug1");
  document.onmousemove = null;
  if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (screenHeight / 2)) { //在上半部分
    if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2) <= (screenWidth / 2)) { //在左半部分
      if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2)) { //靠近上方
        fdiv.style.top = "0px";
      } else { //靠近左边
        fdiv.style.left = "0px";
      }
    } else { //在右半部分
      if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2) <= (screenWidth - (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2))) { //靠近上方
        fdiv.style.top = "0px";
      } else { //靠近右边
        fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
      }
    }
  } else { //下半部分
    if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2) <= (screenWidth / 2)) { //在左半部分
      if ((screenHeight - (parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2)) <= (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2)) { //靠近下方
        fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
      } else { //靠近左边
        fdiv.style.left = "0px";
      }
    } else { //在右半部分
      if ((screenHeight - (parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight) / 2)) <= (screenWidth - (parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth) / 2))) { //靠近上方
        fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
      } else { //靠近右边
        fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
      }
    }
  }
}

function mousemove(ev) {
  console.log("debug mousemove");
  if (ev == null) {
    ev = window.event;
  } //IE
  if ((ev.clientY - posY) <= 0) { //超过顶部
    fdiv.style.top = "0px";
  } else if ((ev.clientY - posY) > (screenHeight - parseInt(fdiv.clientHeight))) { //超过底部
    fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
  } else {
    fdiv.style.top = (ev.clientY - posY) + "px";
  }
  if ((ev.clientX - posX) <= 0) { //超过左边
    fdiv.style.left = "0px";
  } else if ((ev.clientX - posX) > (screenWidth - parseInt(fdiv.clientWidth))) { //超过右边
    fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
  } else {
    fdiv.style.left = (ev.clientX - posX) + "px";
  }
  console.log(posX + " " + fdiv.style.left);
}
window.onload = window.onresize = function () { //窗口大小改变事件
  screenWidth = document.documentElement.clientWidth;
  screenHeight = document.documentElement.clientHeight;
  if ((parseInt(fdiv.style.top) + parseInt(fdiv.clientHeight)) > screenHeight) { //窗口改变适应超出的部分
    fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
  }
  if ((parseInt(fdiv.style.left) + parseInt(fdiv.clientWidth)) > screenWidth) { //窗口改变适应超出的部分
    fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
  }
  document.onmouseup.apply()
};
fdiv.addEventListener('touchstart', fdiv.onmousedown, false);
fdiv.addEventListener('touchmove', function (event) {
  // 如果这个元素的位置内只有一个手指的话
  if (event.targetTouches.length == 1) {
    event.preventDefault(); // 阻止浏览器默认事件，重要
    var touch = event.targetTouches[0];
    if ((touch.pageY) <= 0) { //超过顶部
      fdiv.style.top = "0px";
    } else if (touch.pageY > (screenHeight - parseInt(fdiv.clientHeight))) { //超过底部
      fdiv.style.top = (screenHeight - parseInt(fdiv.clientHeight)) + "px";
    } else {
      fdiv.style.top = (touch.pageY - parseInt(fdiv.clientHeight) / 2) + "px";
    }
    if (touch.pageX <= 0) { //超过左边
      fdiv.style.left = "0px";
    } else if (touch.pageX > (screenWidth - parseInt(fdiv.clientWidth))) { //超过右边
      fdiv.style.left = (screenWidth - parseInt(fdiv.clientWidth)) + "px";
    } else {
      fdiv.style.left = (touch.pageX - parseInt(fdiv.clientWidth) / 2) + "px";
    }
  }
}, false);
fdiv.addEventListener('touchend', document.onmouseup, false);
fdiv.ondblclick = function () { //双击事件可能在手机端浏览器会与网页缩放事件冲突
  console.log("debug ondblclick");
// ##################################################
  var zinput = document.getElementById("srchtxt");
  zinput.value = "123";

  var elements = document.getElementById("contents");
  //var doc3 = elements.childNodes.getElementsByTagName('h1').innerText;

  var obj=document.getElementById("contents");

  var doc3 = document.getElementsByTagName('h1');
  for(var i = 0; i < doc3.length; i++) {
      console.log(doc3[i].innerText);
  }

  var va = document.getElementById("contents").childNodes;
    for(var i=0;i<va.length;i++){
        if(va[i].nodeName.toLocaleUpperCase() == "A"){
        console.log("JS: "+va[i].attributes["linkId"].nodeValue);
        }
    }

    
    //兼容浏览器获取节点文本的方法
    function text(e)
    {
        var t="";
        
        //如果传入的是元素，则继续遍历其子元素
        //否则假定它是一个数组
        e=e.childNodes||e;

        //遍历所有子节点
        for(var j=0;j<e.length;j++){
            //如果不是元素，追加其文本值
            //否则，递归遍历所有元素的子节点
            t+=e[j].nodeType!=1?
                e[j].nodeValue:text(e[j].childNodes);
        }
        //返回区配的文本
        return t;
    }
    console.log(text(obj));




  //var elements = document.getElementsByClassName( "tab" ) ;  // HTMLCollection
  var str = "";
  console.log(elements.length);
  for(var i = 0; i < elements.length; i++) {
      console.log(elements[i].innerHTML);
      str = str + JSON.stringify(elements[i].innerHTML);
      //str = str + JSON.stringify(elements[i].innerText);
      console.log(str);
  }


// 
var text = "テキストデータ";
text = elements.innerHTML;
var blob = new Blob([text], {type: "text/plain"}); // バイナリデータを作ります。
// IEか他ブラウザかの判定
if(window.navigator.msSaveBlob)
{
    // IEなら独自関数を使います。
    window.navigator.msSaveBlob(blob, "ファイル名.txt");
} else {
    // それ以外はaタグを利用してイベントを発火させます
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = 'ファイル名.txt';
    a.click();
}
// ##################################################

  alert("发挥你们的想象力吧");
  //var doc2 = document.getElementById("mhi1st");
  var doc2 = document.getElementById("container");
  if (doc2 == 'undefined' || doc2 == null) {
    console.log('undefined or null');
    //writeToLocal("hoge.txt", "foo\n");
    //writeToLocal('hogetest.txt', 'これはJavaScriptが作成したファイルだよ！\n');
    //handleDownload();
    // 新規ファイル作成
    var href = "data:application/octet-stream," + encodeURIComponent("value");
    this.setAttribute("href", href);
  } else {
    alert(doc2.innerHTML);
    writeFile('/Users/zhangningbo/OneDrive/develop/JavaScript/user.js/testout.txt', doc2.innerHTML);
  };
}

// --------------------------------------------------
// jquery利用 START
// --------------------------------------------------
var load, execute, loadAndExecute;
load = function (a, b, c) {
    console.log("debug2");
    var d;
    d = document.createElement("script"),
      d.setAttribute("src", a),
      b != null && d.addEventListener("load", b),
      c != null && d.addEventListener("error", c),
      document.body.appendChild(d);
    return d
  },
  execute = function (a) {
    console.log("debug3");
    var b, c;
    typeof a == "function" ? b = "(" + a + ")();" : b = a,
      c = document.createElement("script"),
      c.textContent = b,
      document.body.appendChild(c);
    return c
  },
  loadAndExecute = function (a, b) {
    console.log("debug4");
    return load(a, function () {
      return execute(b)
    })
  };
// --------------------------------------------------
// jquery利用 END
// --------------------------------------------------