## part2-jQuery添加常用属性方法
（属性不带括号，方法带括号）

jQuery.fn = jQuery.prototype = {

    jquery ： 版本 
    constructor :  修正正确指向
    init() : 初始化和参数管理
    
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
     
     
### nit() : 初始化和参数管理

        $()  <=> jQuery() 
        
        $(""), $(null), $(undefined), $(false)
        
        $('.div') $('div .div');  $('div')
