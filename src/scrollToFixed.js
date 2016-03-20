(function() {
	var root = this,
			nativeEach = Array.prototype.forEach,
			slice = [].slice;

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
			return elem.ownerDocument.defaultView.getComputedStyle(elem, null)[prop];
		}
	}

	function bind(elem, type, fn) {
		if (elem.addEventListener) {
			elem.addEventListener(type, fn, false);
		} else if (elem.attachEvent) {
			elem.attachEvent(type, fn);
		} else {
			elem['on' + type] = fn;
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

	function scrollToFixed(className, context) {

		var Elements, Origin, Obj;

		Obj = context ? context : root;
				
		if (typeof className !== 'string') {
			throw new Error('you must have used a string classname of elements');
		}

		Elements = $All(className);
		Origin = getOriginData(Elements);

		bind(Obj, 'scroll', function() {
			var self = this,
					scrollTop = self.scrollTop;

			each(Elements, function(elem, index) {
				var top = getOffset(elem).top,
						left = getOffset(elem).left,
						initTop = getOffset(self).top;

				if (scrollTop + initTop > top) {
					elem.style.position = 'fixed';
					elem.style.top = initTop + 'px';
					elem.style.left = left + 'px';
					elem.style.zIndex = 999;
				}

				if (scrollTop + initTop <= Origin[index]) {
					Elements[index].style.position = 'static';
					Elements[index].style.top = 'auto';
					elem.style.left = 'auto';
					Elements[index].style.zIndex = '';
				}
			});
		});
	}

	root.scrollToFixed = scrollToFixed;
}).call(this);