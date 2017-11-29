## extend：jQuery的继承方法

**jQuery.fn.init.prototype = jQuery.fn**; 

**jQuery.fn = jQuery.prototype**

**extend 的用法**：
     	
-  当只写一个对象自变量的时候，JQ中插件的形式,通过$.extend()扩展jquery;
     	
     	
        $(function(){ 
         	$.extend({ // 扩展工具方法
         		aaa : function(){
         			alert(1)
         		},
         		bbb : function(){
        			alert(2)
         		}
         	})
         	$.aaa();
         	$.bbb();
         	
         	$.fn.extend({ // 扩展jQuery实力方法
         		aaa : function(){
         			alert(3)
         		},
         		bbb : function(){
        			alert(4)
         		}
         	})
    
         	$().aaa();
         	$().bbb();
        })
        
     
     
     $.extend(); -> this -> $ -> this.aaa -> $.aaa();
     
     $.fn.extend(); -> this -> $.fn -> this.aaa -> $().aaa();
           

- 当只写多个对象自变量的时候，后面的对象都是扩展到第一个对象身上

        $(function(){
          var a = {};
     	  $.extend(a,{'name':'ssss'},{'age' : '50'})
     	  console.log(a)
        })
        
        结果：
        
        {
            name: "ssss", 
            age: "50"
        }
        
- 浅拷贝(默认) $.extend(a , b)
    
        $(function(){
           var a = {};
            var b = {
            	name : 'hello'
            };
            $.extend(a,b)
            a.name = 'hi';
            console.log(b.name); // hello   
        })
        
- 深拷贝 $.extend(true, a , b)

        $(function(){
            var a = {};
            var b = {
            	name : {
            		age : 30
            	}
            };
            $.extend(true,a,b)
            a.name.age = 20;
             	
            console.log(b.name.age); // 30
        })

### jQuery.extend = jQuery.fn.extend = function() {}

         jQuery.extend = jQuery.fn.extend = function() {
            定义一些变量
            if(typeof target === "boolean"){ // 看是不是深拷贝情况
                 $.extend(true, a , b)
            }
            
            if(typeof target !== "object" && !jQuery.isFunction(target)){ // 看参数是否正确
            }
            
            if(typeof target === "boolean"){ // 看是不是插件情况
            }
            
            312行 -  for(; i < length; i++){ //可能有多个对象的情况
                if(target === copy){} // 放置循环
                if(deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))){} // 深拷贝
                else if (){} //浅拷贝        
            }
    
        }


- JQ中： 拷贝继承 
- JS: 类式继承 / 原型继承
