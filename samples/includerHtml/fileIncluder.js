var includeHtml = function(target, url, hook){
  (function ($) {
    $(function () {
      var $work = $('<div></div>');
      var appendedGroup = new Object();
      var apply = function($target){
        $('[data-func=' + target + ']').each(function(){
          var cpn = $work.find("#" + $(this).attr('data-id'));
          var appended;
          if(cpn[0]){
            var node = cpn.clone().children();
            if(typeof $(this).attr('data-group') !== 'undefined'){
              if (!appendedGroup[$(this).attr('data-group')]){
                appended = $(this).append(node);
                appendedGroup[($(this).attr('data-group'))] = true;
              }
            }else{
              appended = $(this).append(node);
            }
            if (hook) {
                hook.call($(node), $(node));
            } 
          }
        });
      }
 
      if($.support.leadingWhitespace) {
        $work.load(url, apply);
      }else {
        $work.load(url, '', apply);
      }
    });
  }(jQuery));
}