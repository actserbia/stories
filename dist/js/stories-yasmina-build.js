this["stories"] = this["stories"] || {};
this["stories"]["templates"] = this["stories"]["templates"] || {};
this["stories"]["templates"]["storie"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <h3>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.sponsors : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.data : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <h3>Yasmina</h3>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.imgSrc : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.vKaltura : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "          <div class='item item-img'>\n\n              <img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgSrc : depth0), depth0))
    + "\" alt=\"\">\n\n          </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <div class='item item-kaltura'>\n\n              <video poster=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.vKaltura : depth0)) != null ? stack1.poster : stack1), depth0))
    + "/width/480/quality/75/\" preload=\"none\" playsinline>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.vKaltura : depth0)) != null ? stack1.sources : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </video>\n              <div class=\"st-play-button\"></div>\n\n          </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                  <source src=\""
    + alias2(alias1((depth0 != null ? depth0.src : depth0), depth0))
    + "\" type=\""
    + alias2(alias1((depth0 != null ? depth0.type : depth0), depth0))
    + "\">\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.isEqual || (depth0 && depth0.isEqual) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.type : depth0),"external_url",{"name":"isEqual","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.isLinkInternal || (depth0 && depth0.isLinkInternal) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.url : stack1),{"name":"isLinkInternal","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a class=\"st-more\" href=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" alt=\"\">\n          اكتشفي المزيد\n        </a>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a class=\"st-more\" href=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" alt=\"\" target=\"_blank\">\n          اكتشفي المزيد\n        </a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"st-wrapper\" data-designator=\""
    + alias4(((helper = (helper = helpers.designator || (depth0 != null ? depth0.designator : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"designator","hash":{},"data":data}) : helper)))
    + "\">\n\n\n\n\n  <div class=\"st-header\">\n\n    <div class=\"dots-wrapp\"></div>\n\n    <div class=\"st-close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\">\n        <line x1=\"2\" y1=\"2\" x2=\"52\" y2=\"52\" style=\"stroke:rgba(0,0,0,.5);stroke-width:2\"></line>\n        <line x1=\"2\" y1=\"52\" x2=\"52\" y2=\"2\" style=\"stroke:rgba(0,0,0,.5);stroke-width:2\"></line>\n        <line x1=\"0\" y1=\"0\" x2=\"50\" y2=\"50\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n        <line x1=\"0\" y1=\"50\" x2=\"50\" y2=\"0\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n      </svg>\n\n    </div>\n\n    <div class=\"st-logo\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 102 102\">\n        <defs>\n          <clipPath id=\"s-clipCircle-"
    + alias4(((helper = (helper = helpers.storieIndex || (depth0 != null ? depth0.storieIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storieIndex","hash":{},"data":data}) : helper)))
    + "\">\n            <circle r=\"50\" cx=\"50\" cy=\"50\"></circle>\n          </clipPath>\n        </defs>\n        <polygon points=\"0,0 0,100 100,100 100,0\" clip-path=\"url(#s-clipCircle-"
    + alias4(((helper = (helper = helpers.storieIndex || (depth0 != null ? depth0.storieIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storieIndex","hash":{},"data":data}) : helper)))
    + ")\" style=\"fill:white;\" />\n        <image x=\"0\" y=\"0\" clip-path=\"url(#s-clipCircle-"
    + alias4(((helper = (helper = helpers.storieIndex || (depth0 != null ? depth0.storieIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storieIndex","hash":{},"data":data}) : helper)))
    + ")\" width=\"100\" height=\"100\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\""
    + alias4(((helper = (helper = helpers.logo || (depth0 != null ? depth0.logo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data}) : helper)))
    + "\"></image>\n        <circle cx=\"50\" cy=\"50\" r=\"46\" stroke=\"white\" stroke-width=\"3\" fill=\"none\"></circle>\n        <circle cx=\"50\" cy=\"50\" r=\"49\" stroke=\"#9e914c\" stroke-width=\"3\" fill=\"none\"></circle>\n      </svg>\n    </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.sponsors : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.data : stack1)) != null ? stack1.name : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  </div>\n\n\n  <div class='st-main'>\n    <div class='st-slider'>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n  </div>\n\n  <div class='st-footer'>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n</div>\n";
},"useData":true});
var _stories = {};


_stories.log = function(){};
if (location.hash.indexOf("debug-st")>-1){
  _stories.log = console.log;
}

// PREPLAY FIX :: iPhone
var prePlayByMute = function(vid){
  var dfd = $.Deferred();
  var volumechangePreplayHandler = function(ev){
    if (vid.muted === false) {
      $(vid).off('volumechange', volumechangePreplayHandler);
      vid.pause();
      $(vid).parent().addClass('st-video-auto');
      _stories.log("STORIES :: " + 'video '+ $(vid).find('source').eq(0).attr('src') +' preplay volumechange unmuted');
      dfd.resolve();
    }
  }
  $(vid).on('volumechange', volumechangePreplayHandler);
  vid.muted = true;
  vid.muted = false;
  return dfd.promise();
}
// PREPLAY FIX :: other devices
var prePlayByPlay = function(vid){
  var dfd = $.Deferred();
  var timeupdatePreplayHandler = function(ev){
    if (vid.currentTime > 0) {
      $(vid).off('timeupdate', timeupdatePreplayHandler);
      vid.pause();
      $(vid).parent().addClass('st-video-auto');
      //vid.muted = false;
      //vid.currentTime = 0.1; // fix
      _stories.log("STORIES :: " + 'video '+ $(vid).find('source').eq(0).attr('src') +' preplay time-update, t='+vid.currentTime);
      dfd.resolve();
    }
  }
  $(vid).on('timeupdate', timeupdatePreplayHandler);
  //vid.muted = false;
  vid.play();
  return dfd.promise();
}
// PREPLAY FIX
_stories.prePlayVideos = function($context){
  _stories.prePlayVideos = function(){};
  var dfdReturn = $.Deferred();
  var deferreds = [];
  if ( /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ) {
    var preplayFunction = prePlayByMute;
  }
  else {
    var preplayFunction = prePlayByPlay;
  }
  $('video', $context).each(function(i, vid){
     deferreds.push( prePlayByMute(vid) );
  });
  $.when.apply($, deferreds).always(function(){
    _stories.log("STORIES :: " + 'all videos preplayed');
    dfdReturn.resolve();
  });
  return dfdReturn.promise();
};



$.fn.stories = function(set) {


  $allStWrapper = $(this);

  set = set || {};
  var $referralCloseUrl = "#";

  var storiesAll = [];

  var timeoutNext = 0;
  var timeoutNextT = 3000;

  /*
  *
  *  V I D E O   H E L P E R S
  *
  */

  // R E W I N D   A L L   V I D E O S
  var rewindVideos = function($context){
    $('video', $context).each(function(i, video){
      //$(video).addClass('st-playing');
      if (!video.paused) {
        video.pause();
        _stories.log("STORIES :: " + 'one video paused');
      }
      if (video.currentTime > 0.1) {
        video.currentTime = 0;
        _stories.log("STORIES :: " + 'one video t=0');
      }
    });
    _stories.log("STORIES :: " + 'all videos r e w i n d e d');
  };

  // VIDEO AUTOPLAY DETECTION -> .CLASS
  var autoplayDetection = function(ev){
    var video = this;
    if ( video.currentTime > 0 ){
      $(video).off('timeupdate', autoplayDetection);
      $(video).parent().addClass('st-video-auto');
    }
  }
  $('video', $allStWrapper).each(function(i, video){
    $(video).on('timeupdate', autoplayDetection);
  });

  // PLAY BUTTON GESTURE -> PREPLAY FOR AUTOPLAY
  $('.st-play-button', $allStWrapper).one('click', function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    var video = $(this).parent().find('video')[0];
    $('.st-play-button', $allStWrapper).off('click');
    _stories.prePlayVideos().always(function(){
      video.play();
    });
  });


  /*
  *
  *  S L I D E R S
  *
  */

  // ARTICLE SLIDER
  var sliderArticle = function($el){
    var $slides = $el.find('.item');
    $el.on('init', function(ev, slick){
      slick.$slider.data('slick', slick);
      if (slick.slideCount===1) {
        slick.$slider.parents('.st-wrapper').find(".dots-wrapp").append("<ul class='position-indicators'><li class='slick-active'><span></span></li></ul>");
      }
    });
    $el.on('beforeChange', function(ev, slick, currentSlide, nextSlide){
      _stories.log("STORIES :: " + 'article slider beforeChange');
      ev.stopPropagation();
      ev.preventDefault();
      clearTimeout(timeoutNext);
      rewindVideos($allStWrapper);
      $nextItem = slick.$slides.eq(nextSlide);
      $slides = slick.$slides;
      $slides.removeClass('st-active');
      $nextItem.addClass('st-active');
      // video kaltura
      if ($nextItem.hasClass('item-kaltura')) {
          _stories.log("STORIES :: " + 'video item founded');
          $nextItem.find('video')[0].play();
      }
      // igmage
      else if ($nextItem.hasClass('item-img')) {
        _stories.log("STORIES :: " + 'image item founded');
        clearTimeout(timeoutNext)
        timeoutNext = setTimeout(function(){
          next($el);
        }, timeoutNextT);
      }
      // http://redmine.diwanee.com/issues/13476
      $el.parents('.st-wrapper').removeClass('last-slide');
      if (slick.$slides.length-1 == nextSlide) {
        $el.parents('.st-wrapper').addClass('last-slide');
      }
    });
    $slides.on('click', function(ev){
      ev.stopPropagation();

      var viewPortW = window.innerWidth;
      var posX = ev.clientX;
      var aspect = 0.33;
      if ( posX < (aspect*viewPortW) ) {
        prev($el);
      }
      else {
        next($el);
      }
      _stories.log("STORIES :: " + 'CLICK next');
    });
    $('video', $slides).on('ended', function(){
      next($el);
    });
    $el.slick({
      accessibility: false,
      arrows: false,
      infinite: false,
      adaptiveHeight: false,
      mobileFirst: true,
      fade: true,
      swipe: false,
      rtl: false,
      dots: true,
      dotsClass: 'position-indicators',
      appendDots: $el.parents('.st-wrapper').find('.dots-wrapp'),
      customPaging: function(slider, i){
        return "<span></span>";
      }
    });
  }

  // WRAPPER SLIDER
  var sliderWrapper = function($el, initialSlide){

    $el.on("init", function(ev, slick){
      _stories.log("STORIES :: " + "wrapper slider inti");
      $el.trigger('_stories-view', {index: initialSlide});
      ev.stopPropagation();
      ev.preventDefault();
      setTimeout(function(){
        $el.slick('slickGoTo', initialSlide, true);
      }, 0)
    });
    $el.slick({
      accessibility: false,
      arrows: false,
      infinite: false,
      adaptiveHeight: false,
      mobileFirst: true,
      initialSlide: initialSlide,
      dots: false,
      rtl: false,
    });
    $el.on("beforeChange", function(ev, slick, currentSlide, nextSlide){
      _stories.log("STORIES :: " + 'wrap slider beforeChange')
      if (currentSlide !== nextSlide) {
        $el.trigger('_stories-view', {index: nextSlide});
      }
      ev.stopPropagation();
      ev.preventDefault();
      clearTimeout(timeoutNext);
      setHashSilently( (slick.$slides.eq(nextSlide).attr('data-designator')).replace(/^\//, "") );
      var $nextStoryeSlider =  slick.$slides.eq(nextSlide).find('.slick-slider');
      //var $nexItems = $nextStoryeSlider.data('slick').$slides;
      var nextCurrent = $nextStoryeSlider.slick('slickCurrentSlide');
      // if/else fix for Slick's ignorance:: for one item; for 0 GoTo 0;
      if (nextCurrent === 0 ) {
        $nextStoryeSlider.trigger('beforeChange', [$nextStoryeSlider.data('slick'), 0, 0]);
      }
      else {
        $nextStoryeSlider.slick('slickGoTo', 0);
      }
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

  var prev = function($childSlider){
    var $childItems = $childSlider[0].slick.$slides;
    if (!$childItems.first().hasClass('st-active')) {
      $childSlider.slick('slickPrev');
    }
    else {
      prevParent($childSlider);
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

  var prevParent = function($childSlider){
    var $wrapperSlider = $childSlider.parents('.slick-slider');
    var $parentItems = $wrapperSlider[0].slick.$slides;
    if (!$parentItems.first().hasClass('slick-current')) {
      $wrapperSlider.slick('slickPrev');
    }
  };

  var destroy = function(){
    if (document.referrer === "") {
      if (window.history.length > 1){
        window.history.go(-1);
      } else {
        window.location.replace($referralCloseUrl);
      }
    }
    else {
      window.location.replace($referralCloseUrl);
    }
  }





  /*
  *
  * HASH NAVIGATION
  *
  */

  hasher.raw = true;

  var setHashSilently = function(hash, history){
    hasher.changed.active = false; //disable changed signal
    if (history) {
      hasher.setHash(hash);
    }
    else {
      hasher.replaceHash(hash);
    }
    hasher.changed.active = true; //re-enable signal
  }


  var hasherOnChange = function(newHash, oldHash) {
    var designator = "/" + encodeURI(decodeURI(decodeURI(decodeURI(newHash))));
    var index = $('.st-wrapper', $allStWrapper).index( $("[data-designator='" + designator + "']", $allStWrapper) );
    if (index === -1) {
      $allStWrapper.removeClass('st-opened');
      clearTimeout(timeoutNext);
      rewindVideos($allStWrapper);
      return;
    }
    if ( !$allStWrapper.hasClass('slick-initialized') ) {
      $allStWrapper.find('.st-slider').each(function(i, articleSlider){
        var $articleSlider = $(articleSlider);
        sliderArticle($articleSlider);
        var $closeButton = $articleSlider.parents('.st-wrapper').find('.st-close');
        $closeButton.on('click', function(ev){
          $allStWrapper.trigger('_stories-close', {index: i});
          destroy();
        });
        var $moreButton = $articleSlider.parents('.st-wrapper').find('.st-more');
        $moreButton.on('click', function(ev){
          $allStWrapper.trigger('_stories-read-more', {index: i});
        });
      });
      sliderWrapper($allStWrapper, index);
      $allStWrapper.addClass('st-opened');
      $(window).trigger('resize');
      setTimeout(function(){
        $(window).trigger('resize');
      },1000);
    }
    else {
      if ( $('.st-wrapper', $allStWrapper).eq(index).hasClass('slick-current')  ){ // if no slick onChange event is triggered (due to oppening same story)
        $allStWrapper.trigger('_stories-view', {index: index});
      }
      $allStWrapper.addClass('st-opened');
      $allStWrapper.slick('slickGoTo', index, true);
      $(window).trigger('resize');
      setTimeout(function(){
        $(window).trigger('resize');
      },1000);
    }
  }

  hasher.changed.add(hasherOnChange); //add hash change listener
  hasher.initialized.add(hasherOnChange); //add initialized listener (to grab initial value in case it is already set)
  hasher.init(); //initialize hasher (start listening for history changes)


};

/*
 *
 * Author: Diwanee :: Aleksandar Veljkovic :: coa.develop@gmail.com
 *
 * LIFE CICLE
 * 1. Ajax
 * 2. Render
 *   -- user click
 * 3. Preplay
 * ...
 *
 */


'use strict'
        ;
(function ($) {



  // handlebars helpers
  Handlebars.registerHelper('isEqual', function (p1, p2, options) {
    if (p1 === p2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  Handlebars.registerHelper('isLinkInternal', function (link, options) {
    var urlLink = new URL(link);
    if (urlLink.hostname === location.hostname) {
      return options.fn(this);
    }
    return options.inverse(this);
  });



  var $brandsContainer = $('.header-stories');
  var $brands = $('.header-story');
  var apiPrefix = "";
  var apiUrls = [];
  var storiesAll = [];
  var $storiesRendered = $("<div class='all-st-wrapper'></div>");
  var $GAEventRelay = $('.header-stories-in');


  /*
   *
   *  V i s i t e d ?
   *
   */
   var setVisited = function(hash) {
     if (typeof(Storage) !== "undefined") {
       var store = JSON.parse(localStorage.storiesVisited || "[]");
       var id = (/(\d+)(?!.*\d)/).exec(hash)[1];
       if (store.indexOf(id) === -1) {
         store.push(id);
       }
       localStorage.storiesVisited = JSON.stringify(store);
     }
   }
   var isVisited = function(hash) {
     if (typeof(Storage) !== "undefined") {
       var store = JSON.parse(localStorage.storiesVisited || "[]");
       var id = (/(\d+)(?!.*\d)/).exec(hash)[1];
       if (store.indexOf(id) === -1) {
         return false;
       }
       else {
         return true;
       }
     }
   }
   $storiesRendered.on('_stories-view', function(ev, data){
     var index = data.index;
     //console.log(storiesAll[index].designator);
     setVisited(storiesAll[index].designator);
   });
   $brands.each(function(i, o){
     $o = $(o);
     if ( isVisited($o.attr('href')) ) {
       $o.addClass('st-visited');
     }
     else {
       $o.addClass('st-new');
     }
   });


  /*
   *
   *  R E Q U E S T S  /  MEDIA SETTERS
   *
   */

  var getStoryTitle = function (index) {
    return storiesAll[index].data.article_title;
  };

  // REQUEST SINGLE ARTICLE
  var request = function (apiUrl, unique) {
    _stories.log("STORIES :: " + "requesting: " + apiUrl);
    return $.ajax({
      url: apiPrefix + apiUrl,
      dataType: "jsonp",
      jsonpCallback: "jsp" + unique,
      crossDomain: true,
      async: true,
      cache: true,
    });
  }

  // REQUEST ALL ARTICLES
  var getAllData = function () {
    var dfd = $.Deferred();
    var requests = [];
    var _arguments;
    $brands.each(function (i, o) {
      var href = $(o).attr('href').replace(/^[#]/, "");;
      apiUrls[i] = href;
    });
    $.each(apiUrls, function (i, o) {
      requests.push(request(o, i));
    });
    $.when.apply($, requests).always(function (x) {
      dfd.resolve(arguments);
    });
    return dfd.promise();
  }

  // REQUEST AND SET MEDIA IMAGE
  var imgSrc = function(data, params){
    var thumborConfig = $.extend(true, {}, window.appThumborConfig, {thumbor: {
        hasResize: true,
        hasTrim: false,
        isSmart: true,
        resizeWidth: "480",
        resizeHeight: "0"
      }}, params);
    var thumbor = new thumborUrlBuilder(thumborConfig);
    thumbor.setAmazonUrlPath(thumborConfig.amazonS3Path, data);
    return thumbor.finalUrl();
  }
  var setImgSrc = function (obj) {
    var dfd = $.Deferred();
    var data = obj.data;
    obj.imgSrc = imgSrc(data);
    dfd.resolve(obj);
    return dfd.promise();
  }

  // REQUEST AND SET MEDIA KALTURA VIDEO
  var setKalturaSrcs = function (obj) {
    var dfd = $.Deferred();
    var vID = obj.data.remote_id
    kWidget.getSources({
      'partnerId': 676152,
      'entryId': vID,
      'callback': function (data) {
        var sources = [];
        $.each(data.sources, function (i, o) {
          if (o.type === 'video/h264' && (/(.mp4)/).test(o.src) && !o.isOriginal) {
            data.sources[i].type = 'video/mp4';
            sources.push(data.sources[i]);
          }
        });
        data.sources = sources;
        obj.vKaltura = data;
        dfd.resolve(obj);
      }
    });
    return dfd.promise();
  };

  // SET ARTICLE MEDIA
  var setArticleMedia = function (storieData) {
    var dfd = $.Deferred();
    var elements = [];
    $.each(storieData.elements, function (i, o) {
      if (o.type === "image") {
        elements.push(setImgSrc(o));
      } else if (o.type === "video" && o.data.provider === "kaltura") {
        elements.push(setKalturaSrcs(o));
      } else if (o.type === "video" && o.data.provider === "youtube") {
        // not implemented
      }
    });
    $.when.apply($, elements).always(function (x) {
      dfd.resolve(storieData);
    });
    return dfd.promise();
  };



  /*
   *
   *  R U N E R S
   *
   */


   // ADD STORY IF REQUIRED BUT NOT ON HEADER STORYES MENU
   var lHash = encodeURI(decodeURI(decodeURI(decodeURI(location.hash))));
   if (!!location.hash && lHash.indexOf("/story/") !== -1) {
     var hashHref = lHash.replace(/^[#]/, "");
     var exist = false;
     $brands.each(function(i, brand){
       $brand = $(brand);
       if(  $brand.attr('href').replace(/^[#]/, "") === hashHref  ) {
         exist = true;
       }
     });
     if (!exist) {
       _stories.log("STORIES :: " + "Adding extra story from #hash...");
       var $extraStory = $("<a href='#" + hashHref + "' style='display:none;' class='header-story'></a>");
       $('.header-stories-in').append($extraStory);
       $brands = $brands.toArray();
       $brands.unshift($extraStory[0]);
       $brands = $($brands);
     }
   }



   // A J A X I N G, REQUESTING/SETTING   A N D   R E N D E R I N G  (FIRST THING TO DO)
   var run = function(){
     getAllData().always(function(storiesAjaxed){
       var mediaElementSetters = [];
       $.each(storiesAjaxed, function (i, storieAjaxed) {
         if (storieAjaxed[1]!=="success" || typeof(storieAjaxed[0])!=="object" || storieAjaxed[0].length < 1) {
           console.log("STORIES :: story fetch error / not found" );
           return true;
         }
         var storie = storieAjaxed[0];
         try {
           storie.logo = $brands.eq(i).find('svg image').attr('xlink:href') ||
           imgSrc({hash: storie.sponsors[0].elements[0].data.hash}, {resizeWidth: 50});
         }
         catch(e) {
           storie.logo = "/assets/images/icons/apple-touch-icon-57x57.png";
         }
         storie.storieIndex = i;
         storie.designator = $brands.eq(i).attr('href').replace(/^[#]/, "");;
         storiesAll.push(storie);
         mediaElementSetters.push(setArticleMedia(storie));
       });
       $.when.apply($, mediaElementSetters).always(function () {
         _stories.log("STORIES :: " + "AJAXing done");
         var storiesRendered = "";
         $.each(storiesAll, function (i, story) {
           storiesRendered += stories.templates.storie(story, true);
         });
         $storiesRendered.append(storiesRendered);
         $('body').append($storiesRendered);
         $storiesRendered.addClass('st-rendered');


         // GO GO GO
         var onAllImageLoaded = function(){

           $storiesRendered.stories();  /////// <---- 2nd ACT === Stories Slider /////////////////////////////

           var storiesFirstClickHandler = function(ev){
             ev.preventDefault();
             var $this = $(this);
             try {
               _stories.prePlayVideos( $storiesRendered ).always(function(){
                 var hash = $this.attr('href');
                 location.hash = hash;
               });
             }
             catch(e){}
             $brands.off('click', storiesFirstClickHandler);
           }
           $brands.on('click', storiesFirstClickHandler);

           $brands.removeAttr('onclick');
           $brands.removeAttr('ontouchstart');
           $brandsContainer.addClass('st-ready');
         }

         var imgPromises = [];
         $storiesRendered.find('.item-img > img').each(function(i, img){ // wait images to be loaded
           var imgDfd = $.Deferred();
           var $img = $(img);
           if ( $img.prop('complete error') !== true ) {
             $img.on('load error', function(){
               imgDfd.resolve();
             });
           }
           else {
             imgDfd.resolve();
           }
           imgPromises.push(imgDfd.promise());
         })

         $.when.apply($, imgPromises).always(onAllImageLoaded);

         ///////

       });
     });
   }
   if ($('html').hasClass('ua-type-mobile')) {
     run();
   }



  // GA
  $brands.on('click', function(ev){
    var href = $(ev.currentTarget).attr('href');
    if ( href.length > 1 ) {
      var index = $brands.index(ev.currentTarget);
      $GAEventRelay.trigger('stories-click', {
        title: storiesAll[index].data.article_title,
        term: storiesAll[index].terms[0].data.name_english
      });
    }
  });
  $storiesRendered.on('_stories-view', function(ev, data){
    var index = data.index;
    $GAEventRelay.trigger('stories-view', {
      title: storiesAll[index].data.article_title,
      term: storiesAll[index].terms[0].data.name_english
    });
  });
  $storiesRendered.on('_stories-close', function(ev, data){
    var index = data.index;
    $GAEventRelay.trigger('stories-close', {
      title: storiesAll[index].data.article_title,
      term: storiesAll[index].terms[0].data.name_english
    });
  });
  $storiesRendered.on('_stories-read-more', function(ev, data){
    var index = data.index;
    $GAEventRelay.trigger('stories-read-more', {
      title: storiesAll[index].data.article_title,
      term: storiesAll[index].terms[0].data.name_english
    });
  });



  _stories.log("STORIES :: " + 'stories plugin loaded');



  //};


})(jQuery);
