# part10.Queue-队列管理

针对多异步处理，比Deferred更强大。主要针对运动animate()。

    jQuery.extend({
      queue ---> push() 队列中添加
      dequeue ----> shift() 找到队列的第一个
      _queueHooks
    })


    jQuery.fn.extend({
        queue
        dequeue
        delay // 延迟队列执行
        clearQueue
        promise //队列全部执行完毕后，执行
    })

**队列中存储的都是函数**

    function aaa(){
  		alert(1);
  	}

  	function bbb(){
  		alert(2);
  	}

    入队
    $.queue( document , 'q1' , aaa );
    $.queue( document , 'q1' , bbb );
    和
    $.queue( document , 'q1' , [aaa,bbb] );
    等价

    console.log(   $.queue( document , 'q1' )   );
    输出： (2) [ƒ, ƒ]

    出队（取出函数并且调用）
    $.dequeue( document,'q1' );   输出： aaa()执行
    $.dequeue( document,'q1' );   输出：bbb()执行

### 实例方法实现

    function aaa(){
  		alert(1);
  	}

  	function bbb(){
  		alert(2);
  	}

  	$(document).queue('q1',aaa);
  	$(document).queue('q1',bbb);

  	//console.log(  $(document).queue('q1')  );

  	$(document).dequeue('q1');
  	$(document).dequeue('q1');

## 队列在jQuery中作用

    #div1{
      width:100px;
      height:100px;
      background:red;
      position:absolute;
    }

    $(function(){
      $('#div1').click(function(){
    		$(this).animate({width : 300},2000);     setInterval
    		$(this).animate({height : 300},2000);    setInterval
    		$(this).animate({left : 300},2000);      setInterval
    	});
    })

  三个动画利用dequeue方式进行出对入队操作
  ![](./images/Jietu20171221-232417@2x.jpg)

#### Deferred VS queue
1. queue【多异步操作】 可以对同步和异步进行管理，重点是对异步进行管理，比deferred（deferred针对一个异步定时器）更强大，针对多个异步操作
2. queue主要针对animate


    #div1{
      width:100px;
      height:100px;
      background:red;
      position:absolute;
    }

    exam1:
    $(function(){
      $(this).animate({width : 300},2000).queue(function(next){
			$(this).css('height',300);
			next(); <==> $(this).dequeue(); //出队
		}).animate({left : 300},2000);
    })

    exam2:
    $(function(){
      $(this).animate({width : 300},2000,function(){
			$(this).css('height',300);
		}).animate({left : 300},2000);
    })

    总结：
    exam1 和 exam2效果一样，但是queue比callback更强大，
    出队是可以控制的，callback不可以控制。

    exam3:
    $(this).animate({width : 300},2000,function(){
			var This = this;
			var timer = setInterval(function(){
				This.style.height = This.offsetHeight + 1 + 'px';
				if( This.offsetHeight == 200 ){
					clearInterval(timer);
				}
			},30);
		}).animate({left : 300},2000);

    exam4:
    $(this).animate({width : 300},2000).queue(function(next){
			var This = this;
			var timer = setInterval(function(){
				This.style.height = This.offsetHeight + 1 + 'px';
				if( This.offsetHeight == 200 ){

					next(); //在此处出队列

					clearInterval(timer);
				}
			},30);
		}).animate({left : 300},2000);

#### 源码

  jQuery.extend({

    queue: function(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = data_priv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = data_priv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

    dequeue: function(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function() {
					jQuery.dequeue(elem, type);
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// not intended for public consumption - generates a queueHooks object, or returns the current one
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return data_priv.get(elem, key) || data_priv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove(elem, [type + "queue", key]);
				})
			});
		}
  })

  jQuery.fn.extend({

		queue: function(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue(this, type, data);

					// ensure a hooks for this queue
					jQuery._queueHooks(this, type);

					if (type === "fx" && queue[0] !== "inprogress") {
						jQuery.dequeue(this, type);
					}
				});
		},
		dequeue: function(type) {
			return this.each(function() {
				jQuery.dequeue(this, type);
			});
		},
		// Based off of the plugin by Clint Helfers, with permission.
		// http://blindsignals.com/index.php/2009/07/jquery-delay/
		delay: function(time, type) {
			time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
			type = type || "fx";

			return this.queue(type, function(next, hooks) {
				var timeout = setTimeout(next, time);
				hooks.stop = function() {
					clearTimeout(timeout);
				};
			});
		},
		clearQueue: function(type) {
			return this.queue(type || "fx", []);
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function(type, obj) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if (!(--count)) {
						defer.resolveWith(elements, [elements]);
					}
				};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = data_priv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
