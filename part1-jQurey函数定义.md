## **(function(window,undefined){**
    
### 为啥传递函数的参数 window 
  1. 查找速度快，函数作用域
  2. 压缩后不会出错

### 为啥传递函数的参数 undefined 
  1. undefined 在某些浏览器下可以被修改 
    var undefined = 10;
    alert(undefined); IE8 、IE7 => 10; 谷歌 => undefined

    "use strict"; => 严格模式

    window.a == undefined;
    typeof window.a == 'undefined';

### 便于压缩
    // Use the correct document accordingly with window argument (sandbox)
    - location = window.location,
    - document = window.document,
    - docElem = document.documentElement, 
    

### 以下两个防止冲突
    // Map over jQuery in case of overwrite
    - _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
    - _$ = window.$,

### 面向对象写法
    - 普通写法
        function Aaa (){ } 
        Aaa.prototype.init = function(){ } 
        Aaa.prototype.css = function(){ } 
        var a1 = new Aaa ();
        a1.init(); => 初始化
        a1.css(); => 调用

    - jQuery 
        function jQuery (){
            return jQuery.prototype.init(); => 会直接初始化
        }
        jQuery.prototype.init = function(){ } 
        jQuery.prototype.css = function(){ } 

        jQuery.fn.init.prototype = jQuery.prototype;

        jQuery().css();
        
**})(window)**