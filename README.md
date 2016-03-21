# scrollToFixed
Javascript plugin for element sticky to Fixed;

As usual, I think it is easily to sticky a element to fixed at the bottom or the top of window when the window scroll,  
this plugin let your element can fixed at the page when the containter div is scrollable.

- notice:
  this plugin is used when the window can not scrollable. however, it was a litter fun. you can see the demo index.html.

## usage
we add the scrollToFixed as the window varable. so you can use like this:
  
  ```javascript
    //Fisrt string param: the elem's className
    //Context: the scrollable container div
    var context = document.getElementById('main-container');
    var fixed = new scrollToFixed('.task-head', context);
  ```
