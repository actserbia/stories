(function(){
  $.fn.stories = function() {

    var $context = $(this);
    var $clickers = $("a", $context);

    $clickers.on('click', $context, function(ev){
      ev.preventDefault();
      console.log(this);
      return false;
    });

  }
})(jQuery);
