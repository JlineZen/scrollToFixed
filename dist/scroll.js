window.onload=function(){function t(t){return"string"==typeof t?document.getElementById(t):null}function o(t){return"string"==typeof t?document.querySelectorAll(t):null}function n(t,o,n){if(t)if("function"==typeof t.forEach&&t.forEach===i)t.forEach(o);else if(+t.length===t.length)for(var e=0,f=t.length;f>e;e++)o.call(n,t[e],e,t)}function e(t){return{top:t.offsetTop,left:t.offsetLeft}}var i=Array.prototype.forEach,f=t("main-container"),l=o(".task-head"),r=e(f).top;origin={},n(l,function(t,o){origin[o]=e(t).top}),f.addEventListener("scroll",function(){var t=this.scrollTop;n(l,function(o,n){var i=e(o).top,f=e(o).left;t+r>i&&(o.style.position="fixed",o.style.top=r+"px",o.style.left=f+"px"),t+r<=origin[n]&&(o.style.position="static",o.style.top="auto",o.style.left="")})},!1)};