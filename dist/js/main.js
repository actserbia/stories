this["stories"] = this["stories"] || {};
this["stories"]["templates"] = this["stories"]["templates"] || {};
this["stories"]["templates"]["main"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"stories-container\">\n  XXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXX \n</div>\n";
},"useData":true});
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
