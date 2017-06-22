var _stories = {};


_stories.log = function(){};
if (location.hash==="#debug"||location.hash==="#debug-st"){
  _stories.log = console.log;
}


// PREPLAY VIDEOS TO FIX AUTOPLAY
_stories.prePlayVideos = function($context, storieIndex){
  var dfdReturn = $.Deferred();
  var deferreds = [];
  $('video', $context).each(function(i, vid){
    var dfd = $.Deferred();
    deferreds.push(dfd);
    $(vid).one('timeupdate', function(ev){
      ev.stopPropagation();
      vid.pause();
      vid.currentTime = 0.1; // fix
      _stories.log("STORIES :: " + 'video '+ i +' timeupdate, t='+vid.currentTime);
      dfd.resolve();
    });
    vid.play();
  });
  $.when.apply($, deferreds).then(function(){
    _stories.log("STORIES :: " + 'all videos preplayed');
    dfdReturn.resolve();
  });
  _stories.prePlayVideos = function(){};
  return dfdReturn.promise();
};



$.fn.stories = function(set) {


  $allStWrapper = $(this);

  set = set || {};
  var $eventColector = set.$eventColector || $(document);
  var $referralCloseUrl = "#";

  var storiesAll = [];

  var timeoutNext = 0;
  var timeoutNextT = 3000;


  var getStoryTitle = function(index){
    return $allStWrapper.find('st-title').eq(index);
  }



  /*
  *
  *  V I D E O   H E L P E R S
  *
  */

  // REWIND ALL VIDEOS
  var rewindVideos = function($context){
    $('video', $context).each(function(i, video){
      //$(video).addClass('st-playing');
      video.pause();
      video.currentTime = 0;
      _stories.log("STORIES :: " + 'all videos rewinded');
    });
  };

  // VIDEO AUTOPLAY DETECTION -> .CLASS
  $('video', $allStWrapper).each(function(i, video){
    var $video = $(video);
    $video.one('timeupdate', function(){
      $(this).parent().addClass('st-video-auto');
      console.log('TIME UPDATE');
    });
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
      $eventColector.trigger('stories-view', {index: initialSlide, title: getStoryTitle(initialSlide)});
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
        $eventColector.trigger('stories-view', {index: nextSlide, title: getStoryTitle(nextSlide)});
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
      window.history.go(-1);
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


  var hasherOnChange = function(newHash, oldHash){
    var designator = "/" + newHash;
    var index = $('.st-wrapper', $allStWrapper).index( $("[data-designator='" + designator + "']", $allStWrapper) );
    if (index === -1) {
      $allStWrapper.removeClass('st-opened');
      clearTimeout(timeoutNext);
      rewindVideos($allStWrapper);
      return;
    }
    if ( !$allStWrapper.hasClass('slick-initialized') ) {
      $allStWrapper.find('.st-slider').each(function(i, stSlider){
        sliderArticle($(stSlider));
      });
      sliderWrapper($allStWrapper, index);
      $allStWrapper.find(".st-close").on('click', destroy);
      $allStWrapper.addClass('st-opened');
      $(window).trigger('resize');
    }
    else {
      $allStWrapper.addClass('st-opened');
      $allStWrapper.slick('slickGoTo', index, true);
      $(window).trigger('resize');
    }
  }

  hasher.changed.add(hasherOnChange); //add hash change listener
  hasher.initialized.add(hasherOnChange); //add initialized listener (to grab initial value in case it is already set)
  hasher.init(); //initialize hasher (start listening for history changes)


};
