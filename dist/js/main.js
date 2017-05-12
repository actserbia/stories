this["stories"] = this["stories"] || {};
this["stories"]["templates"] = this["stories"]["templates"] || {};
this["stories"]["templates"]["storie"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
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

  return "          <div class='item item-kaltura'>\n\n              <video poster=\"\" playsinline>\n"
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

  return "<div class=\"st-wrapper\">\n\n  <div class=\"st-header\">\n\n    <span class=\"st-close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\">\n        <line x1=\"0\" y1=\"0\" x2=\"50\" y2=\"50\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n        <line x1=\"0\" y1=\"50\" x2=\"50\" y2=\"0\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n      </svg>\n    </span>\n\n    <span class=\"st-logo\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\">\n        <defs>\n          <clipPath id=\"s-clipCircle-"
    + alias4(((helper = (helper = helpers.storieIndex || (depth0 != null ? depth0.storieIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storieIndex","hash":{},"data":data}) : helper)))
    + "\">\n            <circle r=\"50\" cx=\"50\" cy=\"50\"></circle>\n          </clipPath>\n        </defs>\n        <polygon points=\"0,0 0,100 100,100 100,0\" clip-path=\"url(#s-clipCircle-"
    + alias4(((helper = (helper = helpers.storieIndex || (depth0 != null ? depth0.storieIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storieIndex","hash":{},"data":data}) : helper)))
    + ")\" style=\"fill:white;\" />\n        <image x=\"0\" y=\"0\" clip-path=\"url(#s-clipCircle-"
    + alias4(((helper = (helper = helpers.storieIndex || (depth0 != null ? depth0.storieIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storieIndex","hash":{},"data":data}) : helper)))
    + ")\" width=\"100\" height=\"100\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\""
    + alias4(((helper = (helper = helpers.logo || (depth0 != null ? depth0.logo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data}) : helper)))
    + "\"></image>\n        <circle cx=\"50\" cy=\"50\" r=\"46\" stroke=\"white\" stroke-width=\"3\" fill=\"none\"></circle>\n        <circle cx=\"50\" cy=\"50\" r=\"49\" stroke=\"#9e914c\" stroke-width=\"2\" fill=\"none\"></circle>\n      </svg>\n    </span>\n\n    <h3>"
    + alias4(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.sponsors : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.data : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n\n  </div>\n\n\n  <div class='st-main'>\n    <div class='st-slider'>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n\n  <div class=\"storie-ui-left\"></div>\n  <div class=\"storie-ui-right\"></div>\n\n</div>\n";
},"useData":true});
;(function($){
  $.fn.stories = function(set) {

    set = set || {};

    var $brands = $(this).children('div');
    var $clickers = $("a", $(this));

    //var apiPrefix = "http://192.168.0.111:8085/";
    //var apiPrefix = "src/test-api";
    var apiPrefix = set.apiPrefix || "";

    var apiUrls = [];
    var storiesAll = [];
    var $storiesRendered = $();
    var timeoutNext = 0;
    var timeoutNextT = 3000;
    //var storiesData = [];

    // PRELOADER
    $(document).ready(function(ev){
      getAllData().always(function(storiesAjaxed){
        var mediaElementSetters = [];
        $.each(storiesAjaxed, function(i, storieAjaxed){
          var storie = storieAjaxed[0];
          storie.logo = $brands.eq(i).find('svg image').attr('xlink:href');
          storie.storieIndex = i;
          storiesAll.push(storie);
          mediaElementSetters.push(setArticleMedia(storie));
        });
        $.when.apply($, mediaElementSetters).always(function(){
          var storiesRendered = "";
          $.each(storiesAll, function(i, story){
            storiesRendered += stories.templates.storie(story, true);
          });
          $storiesRendered = $("<div class='all-st-wrapper'>"+storiesRendered+"</div>");
          $('body').append($storiesRendered);
          $storiesRendered.addClass('st-ready');
        });
      });
    });


    // STARTER
    $clickers.one('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      $this = $(this);
      var $brand = $this.parent();
      var storieIndex = $brands.index($brand);
      if ($storiesRendered.length < 1 || $storiesRendered.hasClass('opened') || !$storiesRendered.hasClass('st-ready')) {
        return;
      }
      prePlayVideos($storiesRendered);
      $storiesRendered.addClass('opened');
      $('.st-slider', $storiesRendered).each(function(i, slider){
        sliderArticle( $(slider) );
      });
      sliderWrapper($storiesRendered, storieIndex);
      $storiesRendered.find('.st-close').on('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        destroy();
      });
      $clickers.off('click');
      /// reinitialize
      $clickers.on('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        $this = $(this);
        var $brand = $this.parent();
        var storieIndex = $brands.index($brand);
        console.log(storieIndex);
        $storiesRendered.addClass('opened');
        $storiesRendered.slick('slickGoTo', storieIndex, true);
        $(window).trigger('resize');
      });
    });




    // REQUEST SINGLE ARTICLE
    var request = function(apiUrl, unique){
      console.log(apiUrl);
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

    // SET ARTICLE MEDIA
    var setArticleMedia = function(storieData){
      var dfd = $.Deferred();
      var elements = [];
      $.each(storieData.elements, function(i,o){
        if (o.type==="image") {
          elements.push(setImgSrc(o));
        }
        else if (o.type==="video" && o.data.provider==="kaltura") {
          elements.push(setKalturaSrcs(o));
        }
        else if (o.type==="video" && o.data.provider==="youtube") {
        }
      });
      $.when.apply($, elements).always(function(x){
        dfd.resolve(storieData);
      });
      return dfd.promise();
    };

    // ARTICLE SLIDER
    var sliderArticle = function($el){
      var $slides = $el.find('.item');
      $el.on('init', function(ev, slick){
        slick.$slider.data('slick', slick);
      });
      $el.on('beforeChange', function(ev, slick, currentSlide, nextSlide){
          console.log('article slider beforeChange')
          ev.stopPropagation();
          ev.preventDefault();
          rewindVideos($storiesRendered);
          clearTimeout(timeoutNext);
          $nextItem = slick.$slides.eq(nextSlide);
          $slides = slick.$slides;
          $slides.removeClass('st-active');
          $nextItem.addClass('st-active');
          if ($nextItem.hasClass('item-kaltura')) {
            console.log('video item founded');
            $nextItem.find('video')[0].play();
          }
          else if ($nextItem.hasClass('item-img')) {
            console.log('image item founded');
            timeoutNext = setTimeout(function(){
              next($el);
            }, timeoutNextT);
          }
      });

      $el.on('afterChange', function(ev, slick, nextSlide){
        ev.stopPropagation();
        ev.preventDefault();
        //$nextItem = slick.$slides.eq(nextSlide);
        console.log('article slider afterChange --')
        //console.log($nextItem)

      });

      $slides.on('click', function(ev){
        ev.stopPropagation();
        console.log('click next');
        next($el);
      });
      $('video', $slides).on('ended', function(){
        next($el);
      });
      $el.slick({
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        mobileFirst: true,
        fade: true,
        swipe: false,
        rtl: true
      });
    }

    // WRAPPER SLIDER
    var sliderWrapper = function($el, initialSlide){

      $el.on("init", function(ev, slick){
        console.log("wrapper slider inti");
        ev.stopPropagation();
        ev.preventDefault();
        setTimeout(function(){
          $el.slick('slickGoTo', initialSlide);
        }, 0)
      });
      $el.slick({
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        mobileFirst: true,
        initialSlide: initialSlide,
        rtl: true,
      });
      $el.on("beforeChange", function(ev, slick, currentSlide, nextSlide){
        console.log('wrap slider beforeChange :')
        ev.stopPropagation();
        ev.preventDefault();
        var $nextStoryeSlider =  slick.$slides.eq(nextSlide).find('.slick-slider');
        var $nexItems = $nextStoryeSlider.data('slick').$slides;
        var nextCurrent = $nextStoryeSlider.slick('slickCurrentSlide');
        // if/else fix for Slick's ignorance:: for one item; for 0 GoTo 0;
        if (nextCurrent === 0 ) {
          $nextStoryeSlider.trigger('beforeChange', [$nextStoryeSlider.data('slick'), 0, 0]);
        }
        else {
          $nextStoryeSlider.slick('slickGoTo', 0);
        }
      });
      $el.on("afterChange", function(ev, slick, currentSlide){
        ev.stopPropagation();
        ev.preventDefault();
        console.log( 'wrap slider afterChange' );
      });
    }

    var next = function($childSlider){
      var $childItems = $childSlider[0].slick.$slides;
      if (!$childItems.last().hasClass('st-active')) {
        $childSlider.slick('slickNext');
      }
      else {
        nextParent($childSlider);
      }
    };

    var nextParent = function($childSlider){
      var $wrapperSlider = $childSlider.parents('.slick-slider');
      var $parentItems = $wrapperSlider[0].slick.$slides;
      if (!$parentItems.last().hasClass('slick-current')) {
        $wrapperSlider.slick('slickNext');
      }
      else {
        destroy();
      }
    };

    var destroy = function(){
      $storiesRendered.removeClass('opened');
      clearTimeout(timeoutNext);
      rewindVideos($storiesRendered);
      /*
      console.log('destroy');
      $storiesRendered.removeClass('opened');
      rewindVideos($storiesRendered);
      clearTimeout(timeoutNext);
      $storiesRendered.find('.st-slider').each(function(i,storieSlider){
        $(storieSlider).slick('unslick');
        $(storieSlider).off();
        console.log('article slider destoyed');
      });
      $storiesRendered.slick('unslick');
      $storiesRendered.off();

      $('.item', $storiesRendered).off();
      $('video', $storiesRendered).off();

      console.log('wrapper slider destoyed');
      */
    }

    // PREPLAY VIDEOS TO FIX AUTOPLAY
    var prePlayVideos = function($context){
      $('video', $context).each(function(i, vid){
        $(vid).one('timeupdate', function(ev){
          ev.stopPropagation();
          console.log('video timeupdate')
          vid.pause();
          vid.currentTime = 0;
        });
        vid.play();
      });
    };

    var rewindVideos = function($context){
      $('video', $context).each(function(i, video){
        video.pause();
        video.currentTime = 0;
      });
    };

    console.log('stories applied');

  };
})(jQuery);

this["stories"]["templates"]["wrapper"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});