## part2-jQuery添加常用属性方法
（属性不带括号，方法带括号）

    jQuery.fn = jQuery.prototype = {        
        jquery ： 版本 
        constructor :  修正正确指向
        init() : 初始化和参数管理
        selector ()  : 存储选择字符串
        length : this对象的长度 （201行）
        toArray()  :  转数组
        get() ： 转原生集合
        pushStack() ：JQ对象入栈
        each() ： 遍历集合
        ready() ：DOM加载的接口
        slice() ：集合的截取
        first() ： 集合的第一项
        last() ： 集合的最后一项
        eq() ：
        map() ： 对集合进行二次处理，返回一个新集合
        end() ：回溯，找到栈的下一层 （prevObject方法）
        push() ：JQ内部方法
        sort() ：JQ内部方法
        splice() ： JQ内部方法 
    }

### constructor :  修正修正正确指向      
     function Aasa (){}      
     Aasa.prototype.name = 'hello';
     Aasa.prototype.age = 30;     
     var a1 = new Aasa();
     a1.constructor   返回 a1 的构造函数
     
     function Aasa (){} 
      Aasa.prototype = {
            constructor : Aasa, //需要重新指向
            name : 'hello',
            age : 30
      }
     
     var a1 = new Aasa();
     a1.constructor  返回 a1 的构造函数
     
     
### init() : 初始化和参数管理

        $()  <=> jQuery() 
        
        $(""), $(null), $(undefined), $(false)
        
        $('.div') $('div .div');  $('div')

        字符串选择
         
        // $('<li>ssss').appendTo(#('#libraryName'))
        
        if(selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3){            
            match = [null, selector, null];  // match匹配
            
           $('<li>') // match = [null,'<li>', null];  
                      
           $('.div') $('div .div');  $('div')  // match = null

        }else{
            / / $('.div') $('div .div');  $('div') 
                        
            match = rquickExpr.exec(selector); // match匹配
            
            $('#div') //  match = ['#div',null,'div']
        }
   
        iframe中创建元素 $('<li></li>',contentWindow.document)
        
        $.parseHTML  将字符串解析到一个DOM节点的数组中。
        
        $(function(){
        	var str = "<li>1</li><li>2</li><li>3</li><script>alert(1)<\/script>";
        	var arr = jQuery.parseHTML(str,document,true) // ['li','li','li']
        
        	// jQuery.parseHTML 第三个标签 ： script是否插入到页面中  
    	})
    	
    	
    	$.merge 合并数组，在jQuery源码中可以合并json
    	$(function(){
            	 var arr = ['a','b'];
            	 var arr2 = ['c','d']
            	  console.log($.merge(arr,arr2))
          })
         
         结果：
         [a,b,c,d]
         
         $(function(){
        	 var arr = {
        	 	0 : '0',
        	 	1 : '1',
        	 	length : 2
        	 };
        	 var arr2 = ['c','d']
        	 
        	 console.log($.merge(arr,arr2));
         })
         
         结果： 
         
         {
        	 	0 : '0',
        	 	1 : '1',
        	 	3 : c',
        	 	4: 'd',
        	 	length : 4
    	 }
    	 
    	 
    	 $('<li>',{
    	 	title : 'hi',
    	 	html : 'ssss'
    	 }).appendTo('ul')
    	 
    	 rootjQuery = $(document);
    	 $(document).find('div p');    find --> sizzle 里面方法
    	 
    	 
    	 jQuery.makeArray
    	 
    	 
        	 
### this : 
        
        this => {
            0 :  'li'
            1 :  'li',
            2:  'li',
            length : 3,
            ...  
        }
        
### toArray()  :  转数组 只能JQ对象
    $(function(){
    	var divs = $('div'); -> {0 : 'div',1:'div', length : 2}
    	divs.toArray() ['div','div']
    })

 
### get() ： 转原生集合
    $(function(){ 
    	$('div').get(0).innerHTML = '2222'
    	$('div').get()
    	$('div').get(-1)
    	for(var i = 0; i < $('div').get().length; i ++ ){
    		$('div').get()[i].innerHTML = 'ssss'
    	}
    })

### pushStack() ：JQ对象入栈
    栈 ： 先进后出，后进先出
    队列 ： 先进先出。后进后出
    
    $(function(){ 
        $('div').pushStack($('span')).css('background' : 'red').css('background','black'); // span变红色
        $('div').pushStack($('span')).css('background' : 'red').end().css('background','black'); // span变红色
    })    
     
### each() ： 遍历集合 加强版的for循环
### ready() ：DOM加载的接口
### slice() ：集合的截取
    $(function(){ 
     	$('div').slice(1,3).css('background' , 'red');
     	$('div').slice(1,4).css('background' , 'red').end().css('background' , 'black');
    })

### first() ： 集合的第一项 、   last() ： 集合的最后一项 、eq()
     $(function(){ 
     	$('div').first().css('background' , 'red');
     	$('div').last().css('background' , 'black');
     	$('div').eq(0).css('background' , 'red');
     	$('div').eq(-1).css('background' , 'black');
    }) 
### map() 对集合进行二次处理，返回一个新集合
    $(function(){ 
     	 var arr = ['a','b','c','d'];
     	 var arr2 = $.map(arr,function(elem,i){
     	 	return (elem + i);
     	 })
     	 console.log(arr2)
    })
    
     ["a0", "b1", "c2", "d3"]

### end() 回溯，找到栈的下一层 （prevObject方法）

        

        
        
