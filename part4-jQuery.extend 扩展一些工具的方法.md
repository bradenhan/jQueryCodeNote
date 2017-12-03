## part4-jQuery.extend 扩展一些工具的方法

jQuery.extend({ //扩展方法到jQuery身上
   
    expando  ：生成唯一JQ字符串（内部） 返回 jQuery2030651560884655392 
    noConflict() ： 防止冲突
    isReady ：DOM是否加载完（内部）
    readyWait ：等待多少文件的计数器（内部）
    holdReady() ：推迟DOM触发
    ready() ： 准备DOM触发
    isFunction() ： 是否为函数
    isArray() ： 是否为数组
    isWindow() ： 是否为Window
    isNumeric() : 是否为数字
    type() ： 判断数据类型
    isPlainObject() ： 是否为对象自变量
    isEmptyObject() ： 是否为空白对象
    error() ： 抛出异常
    parseHTML() ： 解析节点
    parseJSON ： 解析JSON
    parseXML() ： 解析XML
    noop() ： 空函数
    globalEval() ： 全局解析JS
    camelCase() ： 转驼峰
    nodeName()
    each()
    trim()
    makeArray()
    inArray()
    merge()
    grep()
    map()
    guid
    proxy()
    access()
    now
    swap()  
    
})


### noConflict() 防止冲突

    noConflict: function(deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	}
	
	---------- 使用 --------- 

    var $_new = $.noConflict(); 
    var $ = 123;
    
    $_new(function(){
    	alert($)
    })

### ready()

    $(fuction(){}) // 等DOM加载完就执行  
    $(document).ready(function(){}) <=> $(fuction(){}) <=> $().ready()  ->  jQuery.ready.promise().done(fn); (243行) 创建一个延迟对象
    
    $.ready() 【】 
    
    jQuery.ready.promise = function(obj) {
		if (!readyList) {
			readyList = jQuery.Deferred();
			if (document.readyState === "complete") { // DOM加载完成【document.readyState === "complete"】				
				setTimeout(jQuery.ready); // 针对IE
			} else { 
				document.addEventListener("DOMContentLoaded", completed, false);
				window.addEventListener("load", completed, false);
			}
		}
		return readyList.promise(obj);
	};
	
	completed = function() {
		document.removeEventListener("DOMContentLoaded", completed, false);
		window.removeEventListener("load", completed, false);
		jQuery.ready();
	};
	
	
 
DOMContentLoaded  原生DOM加载完执行函数   
window.onload = function(){} //等所有节点（DOM图片等）都加载完才执行
