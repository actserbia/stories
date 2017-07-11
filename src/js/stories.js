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
        slick.$slider.parents('.st-wrapper').find(".dots-wrapp").append("<ul class='slick-dots'><li class='slick-active'><span></span></li></ul>");
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
