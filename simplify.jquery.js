(function(){ //匿名函数自执行
   （21，94）行是定义了一堆函数和变量 61行 jQuery = function(){} 就是我们常用的$ 或者 jQuery
	
   （96，283）给jQuery对象添加属性方法

    (285,347) extend：jQuery的继承方法 

   （349，817）jQuery.extend 扩展一些工具的方法

	(8818) 行 提供对外接口 window.jQuery = window.$ = jQuery;
})()


jQuery调用：
$('div').css(); -- 扩展实例方法 【jQuery对象能用原生对象不能用】，较高级的方法
$.trim(); -- 扩展静态（工具）方法 【jQuery对象和原生对象都可以用】，更底层的方法
$.proxy(); -- 扩展静态（工具）方法 【jQuery对象和原生对象都可以用 
【一般实例化方法里面都会调用静态方法】

示例：
var arr = new new Array();
arr.push();
arr.sort();