## part2-jQuery添加常用属性方法
（属性不带括号，方法带括号）

    jQuery.fn = jQuery.prototype = {        
        jquery ： 版本 
        constructor :  修正正确指向
        init() : 初始化和参数管理
        selector ()  : 存储选择字符串
        length : this对象的长度 （198行）
        toArray() 
    
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
        	 
### this : 
        
        this => {
            0 :  'li'
            1 :  'li',
            2:  'li',
            length : 3,
            ...  
        }
        

        
        
