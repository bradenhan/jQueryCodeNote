(function(){ //匿名函数自执行
   （21，94）行是定义了一堆函数和变量 61行 jQuery = function(){} 就是我们常用的$ 或者 jQuery
	
   （96，283）给jQuery对象添加属性方法

    (285,347) extend：jQuery的继承方法 

   （349，817）jQuery.extend 扩展一些工具的方法

   （877,2880）Sizzle 复杂选择其的实现

    (2904,3066) Callbacks ：回调对象 -- 对函数的统一管理

    (3068,3207) Deferred : 延迟对象 -- 对异步的统一管理 （定时器、ajax）

    (3209,3322) support ： 功能检测 -- 

    (3335,3681) data() : 数据缓存

    (3683,3826) queue() 队列管理 

    (3835,4331) attr() prop() val() addClass()等对元素属性的操作

   （4334，5169）on() off() trigger() 事件操作的相关方法

   （5172，6105）DOM的操作 ： 添加 删除 获取 包装

   （6108，6678）CSS() ：针对样式的操作

   （6680，7927）提交数据和ajax() -- ajax() load() getJson()

    (7930,8671) show() hide() animate() -- 运动的方法

    (8674,8896) offset() pageYOffset（） -- 位置与尺寸的方法

   （8909，8928）JQ支持模块化的模式

	(8933) 行 提供对外接口 window.jQuery = window.$ = jQuery;
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

### 复杂选择其的实现
$('ul li + p input[type="text"]').css();

### Callbacks ：回调对象 -- 函数的一个统一管理

function fn1(){
	alert(1)
}

function fn2(){
	alert(2)
}

var cb = $.Callbacks();

cb.add(fn1)
cb.add(fn2)

cb.fire(); // 1,2

cb.remove(fn2); 

cb.fire(); // 1

### Deferred : 延迟对象 -- 对异步的统一管理 （定时器、ajax）

setTimeout(function(){
	alert(1)
},1000)
alert(2)
输出结果 ： 2 1 

----- 

var fdf = $.Deferred();
setTimeout(function(){
	alert(1);
	fdf.resolve()
},1000)；

fdf.done(function(){
	alert(2)
});
输出结果 ：1 2  

### data() : 数据缓存

$('.div1').data('name','hjello');
$('.div1').data('name'); 
输出结果: hello

### queue() 队列管理
$('.div1').animate({{left : 100}})
$('.div1').animate({{top : 100}})
$('.div1').animate({{width : 100}})