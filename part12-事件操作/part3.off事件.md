# off事件

## off

## 源码

jQuery.fn.extend({

    off: function(types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(
          handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
          handleObj.selector,
          handleObj.handler
        );
        return this;
      }
      if (typeof types === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }

      //注意此处
      return this.each(function() {
        jQuery.event.remove(this, types, fn, selector);
      });

    },

})

## 其他：

> **delegate/undelegate 源码** -- 调用off()

    delegate: function( selector, types, data, fn ) {
      return this.on( types, selector, data, fn );
    },
    undelegate: function(selector, types, fn) {
    	// ( namespace ) or ( selector, types [, fn] )
    	return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    }

> **hover 源码** -- 调用mouseenter()、mouseleave()


    hover: function(fnOver, fnOut) {
    	return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },

> **trigger/triggerHandler源码** 调用jQuery.event.trigger

trigger -- 主动触发事件


    trigger: function(type, data) {
    	return this.each(function() {
    		jQuery.event.trigger(type, data, this);
    	});
    },
    triggerHandler: function(type, data) {
    	var elem = this[0];
    	if (elem) {
    		return jQuery.event.trigger(type, data, elem, true);
    	}
    }
**使用**

    $('#input1').focus(function(){
    	$(this).css('background','red');
    });

    //$('#input1').trigger('focus');
    $('#input1').triggerHandler('focus');   //不会触发当前事件的默认行为

> **bind/unbind源码**

    bind: function( types, data, fn ) {
  		return this.on( types, null, data, fn );
  	},
  	unbind: function( types, fn ) {
  		return this.off( types, null, fn );
  	},
