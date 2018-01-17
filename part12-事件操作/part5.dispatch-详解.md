# part5.dispatch-详解


    $(document).on('mousedown',function(ev){
      alert(ev.pageX);
      // ev : jq中的event
      alert(ev.originalEvent);
      // ev.originalEvent : 原生JS中的event
      // changedTouches
      alert(  ev.clientY );
    });
