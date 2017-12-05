## part4-jQuery.extend 扩展一些工具的方法

jQuery.extend({ //扩展方法到jQuery身上
   
    expando  ：生成唯一JQ字符串（内部） 返回 jQuery2030651560884655392 ，主要做映射关系
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
    camelCase() ： 转驼峰（内部）
    nodeName() : 是否为制定节点名（内部）
    each()
    trim()
    makeArray() 类数组转换成真正数组
    inArray() 数组版的indexOf
    merge() 合并数组
    grep()
    map()
    guid
    proxy()
    access()
    now()
    swap() CSS交换（内部）  
    
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


    $(function(){
    	console.log(this) ==> document
    })
    
    $(document).on('ready',function(){
	   ....
    });
    
    $(function(arg){
    	console.log(arg) ==>. jquery函数
    })

### holdReady() 推迟DOM触发 --- 用于加载顺序


    $.holdReady(true); //开启     
    $.holdReady(false); //关闭
    
例子：

    $.holdReady(true); //开启  
    $.getScript('a.js',function(){
    	$.holdReady(false); //关闭
    })
    $(function(arg){
    	console.log(arg)
    })

### isFunction() 是否为函数
    isFunction: function(obj) {
		return jQuery.type(obj) === "function";
	},

    function show(){ } 
    $.isFunction(show) ==> true
    $.isFunction([]) ==> false

### isArray() 是否为数组

    isArray: Array.isArray
    
    
### isWindow()
    isWindow: function(obj) {
		return obj != null && obj === obj.window;
	},
    
    $.isWindow(show) ==> false
    $.isWindow(window) ==> true

### isNumeric() 是否为数字

    isNumeric: function(obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	},
    
    isFinite() // 有限数组
    isFinite(Number.MAX_VALUE + Number.MAX_VALUE) ==> false 
    
    typeof(123) ==> number
    typeof(NaN) ==> number
    $.isNumeric(NaN) ==> false
    
### type() 判断数据类型

    type: function(obj) {
		if (obj == null) {
			return String(obj);
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[core_toString.call(obj)] || "object" :
			typeof obj;
	},
    
    
    var a = 'hello';
    var b = [];
    $.type(a) ==> string
    $.type(b) ==> array

    var ss = {}
    ss.toString.call('hello') ==> [object String]

### isPlainObject() 是否为对象自变量

    isPlainObject: function(obj) {
		if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
			return false;
		}
		try {
			if (obj.constructor &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
		} catch (e) {
			return false;
		} 			
		return true;
	},

    var a = {
    	a : 'ddd'
    }
    var b = [];
    $.isPlainObject(a) ==> true
    $.isPlainObject(b) ==> false

### isEmptyObject() 是否为空白对象

    isEmptyObject: function(obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	},
	
	var a = []
    var b = {}
    $.isEmptyObject(a) ==> true
    $.isEmptyObject(b) ==> true

### error() 抛出异常
    error: function(msg) {
		throw new Error(msg);
	},

    $.error('这是错误') 
    
### parseHTML() 解析节点

    parseHTML: function(data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec(data),
			scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = jQuery.buildFragment([data], context, scripts);

		if (scripts) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	},

    var str = '<li>ssss</li><li>ssss</li>';
    $.parseHTML(str,document)

### parseJSON() 把字符串解析成JSON

    parseJSON: JSON.parse,

    var str ='{"name" : "hello"}';
    $.parseJSON(str) ==> {name: "hello"}
    
    JSON.stringify ==> 把JSON解析成字符串

### parseXML() 解析XML成DOM节点
    
    parseXML: function(data) {
		var xml, tmp;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	},
    
    
    var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
    xmlDoc = $.parseXML( xml ),
    $xml = $( xmlDoc ),
    $title = $xml.find( "title" );
     
    /* append "RSS Title" to #someElement */
    $( "#someElement" ).append( $title.text() );
     
    /* change the title to "XML Title" */
    $title.text( "XML Title" );
     
    /* append "XML Title" to #anotherElement */
    $( "#anotherElement" ).append( $title.text() );
    
### noop() 空函数

    noop: function() {},

    function Aaa (){
    	this.default = {
    		show : function(){} // show : $.noop
    	}
    }
    
    Aaa.prototype.init = function(opt){
    	$.extend(this.default , opt )
    };

### globalEval() 全局解析JS

    globalEval: function(code) {
		var script,
			indirect = eval;

		code = jQuery.trim(code);

		if (code) { 
			if (code.indexOf("use strict") === 1) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild(script).parentNode.removeChild(script);
			} else { 				
			     indirect(code);
			}
		}
	},


    function test(){
        jQuery.globalEval("var newVar = true;")
        
        // eval("var newVar = true;") 也可以
    }
    test();
    // newVar === true

### camelCase() 转驼峰 （内部）

    camelCase: function(string) {
		return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
	},
    
    // 子项
    rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,
    
    fcamelCase = function(all, letter) {
		return letter.toUpperCase();
	},
    
    $(function(){  
        $.camelCase('sss-html')
    })

### nodeName（）是否为制定节点名（内部）

    nodeName: function(elem, name) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    
    
    $(function(){ 
    	$.nodeName(document.documentElement,'html')
    })
    
### each() 遍历集合
    each: function(obj, callback, args) { // args 内部变量
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike(obj);

		if (args) {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			}

			// A special, fast, case for the most common use of each
		} else {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			}
		}

		return obj;
	},

    $(function(){ 
    	var arr = ['a','c','v','d'];
    	var json = {'name':'sss','asss' : 'sss'}
    
    	$.each(arr ,function(i,value){
    		console.log(i,value)
    	})
    
    	$.each(json ,function(i,value){
    		console.log(i,value)
    	})
    })

### makeArray() 类数组转换成真正数组 

    var oDiv = document.getElementsByTagName('div');
	 var str = 'hello';
	 var json = {'name':'ssss','age': 'sss'}
	 console.log($.makeArray(oDiv)); ==> [div#div1, div, div, div]
	 console.log($.makeArray(str)); ==> ["hello"]
	 console.log($.makeArray(json)); ==> [{name: "ssss", age: "sss"}]



### inArray() 数组版的indexOf

    inArray: function(elem, arr, i) {
    return arr == null ? -1 : core_indexOf.call(arr, elem, i);
		},
		
    $(function(){ 
    	var arr = ['a','c','v','d']; 
    	$.inArray('a',arr) ==> 0
    })

### merge()合并数组
    merge: function(first, second) {
    	var l = second.length,
    		i = first.length,
    		j = 0;
    
    	if (typeof l === "number") {
    		for (; j < l; j++) {
    			first[i++] = second[j];
    		}
    	} else {
    		while (second[j] !== undefined) {
    			first[i++] = second[j++];
    		}
    	}
    
    	first.length = i;
    
    	return first;
    },
    
    $(function(){ 
    	var arr = ['a','c','v','d']; 
    	var json = {0:'sss',1 : 'sss'} 
    	var newArr = $.merge(arr,json)
    })
    
### grep() 过滤得到新数组，愿数组不变

    grep: function(elems, callback, inv) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;
 
		for (; i < length; i++) {
			retVal = !!callback(elems[i], i);
			if (inv !== retVal) {
				ret.push(elems[i]);
			}
		}

		return ret;
	},
	

    $(function(){ 
    	var arr = [ 1, 9 ];
    	arr = $.grep(arr, function(n, i){
    	  return (n >= 5);
    	});  ==> [9]
    	
    	var arr = [ 1, 9 ];
    	arr = $.grep(arr, function(n, i){
    	  return (n >= 5); 
    	},true); ==> [1]
    })

### map() 映射新数组
    
    // arg is for internal usage only
	map: function(elems, callback, arg) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike(elems),
			ret = [];

		// Go through the array, translating each of the items to their
		if (isArray) {
			for (; i < length; i++) {
				value = callback(elems[i], i, arg);

				if (value != null) {
					ret[ret.length] = value;
				}
			}

			// Go through every key on the object,
		} else {
			for (i in elems) {
				value = callback(elems[i], i, arg);

				if (value != null) {
					ret[ret.length] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply([], ret);
	},
	

    $(function(){ 
    	var arr = [ 1, 9, 3];
    	arr = $.map(arr, function(i){
    	  return i + 1;
    	});  ==> [2, 10, 4]
    })

### guid 唯一标识符 （内部）


### proxy() 改变this指向
    
    

    var obj = {
        name: "John",
        test: function() {
          alert(this)
        }
      };
    
     $(document).on( "click", $.proxy( obj.test, obj) );
    $(document).on( "click", $.proxy( obj, "test" ) );
    
    $(function(){ 
    	function show(){ 
    		alert(this)
    	}  
    	
    	$('div').eq(0).click($.proxy(show , window))
    })

### access() 设置多功能值操作 （内部）

    $().css() $().attr() 
    
    $('div').css({width: '200px',height: '400px'})

### now() 当前时间

    $.now(); ==> 1512484915352
    
### swap() CSS交换（内部）


### jQuery.ready.promise = function(obj) {}

### function isArraylike(obj) {}

### rootjQuery = jQuery(document);
