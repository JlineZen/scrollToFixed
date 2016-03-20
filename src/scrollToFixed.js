(function() {
	var root = this;
	var nativeEach = Array.prototype.forEach;

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

	function $(id) {
		return typeof id === 'string' ? document.getElementById(id) : null;
	}

	function $All(clsName) {
		return typeof clsName === 'string' ? document.querySelectorAll(clsName) : null;
	}

	function $once(className) {
		return typeof className === 'string' ? document.querySelector(className) : null;
	}

	function getCssStyle(elem, prop) {
		if (elem.currentStyle) {
			return elem.currentStyle[prop];
		} else if (window.getComputedStyle) {
			return ele.ownerDocument.defaultView.getComputedStyle(elem, null)[prop];
		}
	}

	function getOffset(elem) {
		var parent = elem.offsetParent;
		if (parent) {
			elem.offsetTop += parent.offsetTop;
			elem.offsetLeft += parent.offsetLeft;
		}
		return {
			top : elem.offsetTop,
			left : elem.offsetLeft
		}
	}

	function getOriginData(elems) {
		var origin = {};
		each(elems, function(elem, index) {
			var offset = getOffset(elem);
			origin[index] = offset.top;
		});

		return origin;
	}

	function scrollToFixed(elems, options) {

		var target = options.context ? options.context : root,
				origin = getOriginData(elems);

		target.addEventListener('scroll', function() {
			var scrollTop = target.scrollTop;	

			each(elems, function(elem, index) {
				var top = getOffset(elem).top,
						initTop = target === window ? 0 : getOffset(target).top;

				if (scrollTop + initTop > top) {
					elem.style.position = 'fixed';
					elem.style.top = initTop + 'px';
					elem.style.zIndex = 999;
				}

				if (scrollTop + initTop <= origin[index]) {
					elems[index].style.position = 'static';
					elems[index].style.top = 'auto';
					elems[index].style.zIndex = '';
				}
			});
		}, false);
	}

	root.scrollToFixed = scrollToFixed;
}).call(this);