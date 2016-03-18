window.onload = function() {
    var nativeEach = Array.prototype.forEach;

    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : null;
    }

    function $all(clsName) {
        return typeof clsName === 'string' ? document.querySelectorAll(clsName) : null;
    }

    function $class(clsName) {
        return typeof clsName === 'string' ? document.querySelector(clsName) : null;
    }

    function each(obj, callback, context) {
        if (!obj) return;
        if (typeof obj.forEach === 'function' && obj.forEach === nativeEach) {
            obj.forEach(callback);
        } else if (+obj.length === obj.length) {
            for (var i = 0, len = obj.length; i < len; i++) {
                callback.call(context, obj[i], i, obj);
            }
        }
    }

    function getOffset(obj) {
        return {
        	top: obj.offsetTop,
        	left: obj.offsetLeft 
        };
    }

  	function getCssStyle(elem, prop) {
  		if (elem.currentStyle) {
  			return elem.currentStyle[prop];
  		} else if (window.getComputedStyle) {
  			return elem.ownerDocument.defaultView.getComputedStyle(elem, null)[prop];
  		}
  	} 

    var mainContainer = $('main-container'),
    		taskHeaders = $all('.task-head'),
    		initTop = getOffset(mainContainer).top;
    		origin = {};

    each(taskHeaders, function(taskHead, index) {
    	origin[index] = getOffset(taskHead).top;
    });

    mainContainer.addEventListener('scroll', function() {
        var scrollTop = this.scrollTop;
        each(taskHeaders, function(taskHead, index) {
        	var top = getOffset(taskHead).top,
        			left = getOffset(taskHead).left;

        	if (scrollTop + initTop > top) {
        		taskHead.style.position = 'fixed';
        		taskHead.style.top = initTop + 'px';
        		taskHead.style.left= left + 'px';
        	} 
        	if (scrollTop + initTop <= origin[index]) {
        		taskHead.style.position = 'static';
        		taskHead.style.top = 'auto',
        		taskHead.style.left= '';
        	}
        });
    }, false);
};