# on事件

## on

## 源码

jQuery.fn.extend({

    on: function(types, selector, data, fn, /*INTERNAL*/ one) {
  			var origFn, type;

  			// Types can be a map of types/handlers
  			if (typeof types === "object") {
  				// ( types-Object, selector, data )
  				if (typeof selector !== "string") {
  					// ( types-Object, data )
  					data = data || selector;
  					selector = undefined;
  				}
  				for (type in types) {
  					this.on(type, selector, data, types[type], one);
  				}
  				return this;
  			}

  			if (data == null && fn == null) {
  				// ( types, fn )
  				fn = selector;
  				data = selector = undefined;
  			} else if (fn == null) {
  				if (typeof selector === "string") {
  					// ( types, selector, fn )
  					fn = data;
  					data = undefined;
  				} else {
  					// ( types, data, fn )
  					fn = data;
  					data = selector;
  					selector = undefined;
  				}
  			}
  			if (fn === false) {
  				fn = returnFalse;
  			} else if (!fn) {
  				return this;
  			}

  			if (one === 1) {
  				origFn = fn;
  				fn = function(event) {
  					// Can use an empty set, since event contains the info
  					jQuery().off(event);
  					return origFn.apply(this, arguments);
  				};
  				// Use same guid so caller can remove using origFn
  				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
  			}

        // 注意此处
  			return this.each(function() {
  				jQuery.event.add(this, types, fn, data, selector);
  			});

  		},
})

## 1. 使用方法

- 二个参数

      $('#div1').on('click',function(){
        alert(123);
      });


- 三个参数

      $('#div1').on('click',{name:'hello'},function(ev){
    		alert(ev.data.name);
    	});

- 四个参数

    > **事件委托**

      $('ul').delegate('li','click',{name:'hello'},function(){
    		$(this).css('background','red');
    	});

  > **delegate 源码**

      delegate: function(selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      }

    所以

      $('ul').delegate('li','click',{name:'hello'},function(){
        $(this).css('background','red');
      });

    等价于：

      $('ul').on('click','li',{name:'hello'},function(){
    		$(this).css('background','red');
    	});

#### 详细讲解

##### 1. 第一个参数是对象

    $('#div1').on({
  		'click' : function(){
  			alert(123);
  		},
  		'mouseover' : function(){
  			alert(456);
  		}
  	});

### bind/unbind  – 调用on()/off()

### 源码
jQuery.fn.extend({

      bind: function(types, data, fn) {
  			return this.on(types, null, data, fn);
  		},

      unbind: function(types, fn) {
  			return this.off(types, null, fn);
  		},
})

**解析：**
- 调用的on，但是没有委托形式
- 老式写法，现在基本很少用

### on --  事件只执行一次

**源码**

    one: function(types, selector, data, fn) {
    	return this.on(types, selector, data, fn, 1);
    },

**使用**

    $('#div1').one('click',function(){
    		alert(123);
    });
