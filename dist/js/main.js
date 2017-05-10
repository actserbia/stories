this["stories"] = this["stories"] || {};
this["stories"]["templates"] = this["stories"]["templates"] || {};
this["stories"]["templates"]["storie"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "boban\n";
},"useData":true});
;(function($){
  $.fn.stories = function() {

    var $context = $(this);
    var $brands = $context.children('div');
    var $clickers = $("a", $context);

    //var apiPrefix = "http://192.168.0.111:8085/";
    var apiPrefix = "src/test-api";

    var apiUrls = [];
    var storiesData = [];

    // STARTER
    $clickers.on('click', $context, function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      var $brand = $(this).parent();
      var storieIndex = $brands.index($brand);
      getAllData().always(function(storiesData){
        //console.log( stories.templates.storie(null, true) );
        //return;
        var storieData = storiesData[storieIndex][0];
        storieData.logo = $brand.find('image').attr('xlink:href');
        renderArticle(storieData);
      });
    });


    // REQUEST SINGLE ARTICLE
    var request = function(apiUrl, unique){
      return $.ajax({
        url: apiPrefix + apiUrl,
        dataType : "jsonp",
        jsonpCallback: "jsp"+unique,
        crossDomain: true,
        async: true,
        cache: true,
      });
    }

    // REQUEST ALL ARTICLES
    var getAllData = function(){
      var dfd = $.Deferred();
      var requests = [];
      var _arguments;
      $brands.each(function(i, o){
        var href = $(o).find('a').eq(0).attr('href');
        apiUrls[i] = href;
      });
      $.each(apiUrls, function(i, o){
        requests.push(request(o, i));
      });
      $.when.apply($, requests).always(function(x){
        dfd.resolve(arguments);
      });
      return dfd.promise();
    }

    // REQUEST AND SET MEDIA IMAGE
    var setImgSrc = function (obj) {
      var dfd = $.Deferred();
      var data = obj.data;
      var thumborConfig = $.extend(true, {}, window.appThumborConfig, {thumbor: {
        hasResize: true,
        hasTrim: false,
        isSmart: true,
        resizeWidth: "800",
        resizeHeight: "0"
      }});
      var thumbor = new thumborUrlBuilder(thumborConfig);
      thumbor.setAmazonUrlPath(thumborConfig.amazonS3Path, data);
      obj.imgSrc = thumbor.finalUrl();
      dfd.resolve(obj);
      return dfd.promise();
    }
    // REQUEST AND SET MEDIA KALTURA VIDEO
    var setKalturaSrcs = function(obj){
      var dfd = $.Deferred();
      var vID = obj.data.remote_id
      kWidget.getSources({
        'partnerId': 676152,
        'entryId': vID,
        'callback': function(data){
          var sources = [];
          $.each(data.sources, function(i,o){
            if (o.type === 'video/h264' && (/(a.mp4)/).test(o.src) && !o.isOriginal) {
              data.sources[i].type = 'video/mp4';
              sources.push(  data.sources[i] );
            }
          });
          data.sources = sources;
          obj.vKaltura = data;
          dfd.resolve(obj);
        }
      });
      return dfd.promise();
    }

    // RENDER
    var renderArticle = function(storieData){
      var elements = [];
      $.each(storieData.elements, function(i,o){
        if (o.type==="image") {
          elements.push(setImgSrc(o));
        }
        else if (o.type==="video" && o.data.provider==="kaltura") {
          elements.push(setKalturaSrcs(o))
        }
        else if (o.type==="video" && o.data.provider==="youtube") {
        }
      });
      $.when.apply($, elements).always(function(x){
        var $storie = $(stories.templates.wrapper(storieData, true));
        $(".st-close", $storie).on('click', function(){
          $storie.remove();
        });
        $('body').append($storie);
        sliderArticle($('main .slider', $storie), $storie);
      });
    }

    // SLIDER INTI
    var sliderArticle = function($el, $context){
      var $slides = $el.find('.item');
      $el.on('beforeChange init', function(ev, slick, currentSlide, nextSlide){
          var $current = slick.$slides.eq(currentSlide);
          var $next = (nextSlide) ? slick.$slides.eq(nextSlide) : slick.$slides.eq(0);
          if ($current.find('video').length > 0) {
            $current.find('video')[0].pause();
            $current.find('video')[0].currentTime = 0;
          }
          if ($next.find('video').length > 0) {
            $next.find('video')[0].currentTime = 0;
            $next.find('video')[0].play();
          }
      });
      $slides.on('click', function(eve){
        $el.slick('slickNext');
      });
      $el.slick({
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        mobileFirst: true,
        fade: true,
        swipe: false
      });
    }

  };
})(jQuery);

this["stories"]["templates"]["wrapper"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.imgSrc : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vKaltura : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "          <div class='item item-img'>\n\n              <img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgSrc : depth0), depth0))
    + "\" alt=\"\">\n\n          </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <div class='item item-kaltura'>\n\n              <video controls playsinline>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.vKaltura : depth0)) != null ? stack1.sources : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </video>\n\n          </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                  <source src=\""
    + alias2(alias1((depth0 != null ? depth0.src : depth0), depth0))
    + "\" type=\""
    + alias2(alias1((depth0 != null ? depth0.type : depth0), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"st-wrapper\">\n\n  <div class=\"st-header\">\n\n    <span class=\"st-close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\">\n        <line x1=\"0\" y1=\"0\" x2=\"50\" y2=\"50\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n        <line x1=\"0\" y1=\"50\" x2=\"50\" y2=\"0\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n      </svg>\n    </span>\n\n    <span class=\"st-logo\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\">\n        <defs>\n          <clipPath id=\"s-clipCircle\">\n            <circle r=\"50\" cx=\"50\" cy=\"50\"></circle>\n          </clipPath>\n        </defs>\n        <polygon points=\"0,0 0,100 100,100 100,0\" clip-path=\"url(#s-clipCircle)\" style=\"fill:white;\" />\n        <image x=\"0\" y=\"0\" clip-path=\"url(#s-clipCircle)\" width=\"100\" height=\"100\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\""
    + alias4(((helper = (helper = helpers.logo || (depth0 != null ? depth0.logo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data}) : helper)))
    + "\"></image>\n        <circle cx=\"50\" cy=\"50\" r=\"46\" stroke=\"white\" stroke-width=\"3\" fill=\"none\"></circle>\n        <circle cx=\"50\" cy=\"50\" r=\"49\" stroke=\"#9e914c\" stroke-width=\"2\" fill=\"none\"></circle>\n      </svg>\n    </span>\n\n    <h3>"
    + alias4(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.sponsors : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.data : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n\n  </div>\n\n\n  <main>\n    <div class='slider'>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    "
    + alias4(((helper = (helper = helpers.main || (depth0 != null ? depth0.main : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data}) : helper)))
    + "\n  </main>\n\n\n\n\n  <div class=\"storie-ui-left\"></div>\n  <div class=\"storie-ui-right\"></div>\n\n</div>\n";
},"useData":true});