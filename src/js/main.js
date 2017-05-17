'use strict'

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
          clearTimeout(timeoutNext);
          rewindVideos($storiesRendered);
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

      //$el.on('afterChange', function(ev, slick, nextSlide){
      //  ev.stopPropagation();
      //  ev.preventDefault();
      //  //$nextItem = slick.$slides.eq(nextSlide);
      //  console.log('article slider afterChange --')
      //});

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
        rtl: false
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
        rtl: false,
      });
      $el.on("beforeChange", function(ev, slick, currentSlide, nextSlide){
        console.log('wrap slider beforeChange :')
        ev.stopPropagation();
        ev.preventDefault();
        clearTimeout(timeoutNext);
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
      //$el.on("afterChange", function(ev, slick, currentSlide){
      //  ev.stopPropagation();
      //  ev.preventDefault();
      //  console.log( 'wrap slider afterChange' );
      //});
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

    // PRELOADER
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
        console.log("AJAXing done");
        var storiesRendered = "";
        $.each(storiesAll, function(i, story){
          storiesRendered += stories.templates.storie(story, true);
        });
        $storiesRendered = $("<div class='all-st-wrapper'>"+storiesRendered+"</div>");
        $('body').append($storiesRendered);
        $storiesRendered.addClass('st-ready');
      });
    });



    // STARTER
    $clickers.on('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      var $this = $(this);
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


    // HANDLEBAR HELPERS
    Handlebars.registerHelper('isEqual', function(p1, p2, options) {
      if(p1 === p2){
        return options.fn(this);
      }
      return options.inverse(this);
    });
    Handlebars.registerHelper('isLinkInternal', function(link, options) {
      var urlLink = new URL(link);
      if(urlLink.hostname===location.hostname){
        return options.fn(this);
      }
      return options.inverse(this);
    });



    console.log('stories applied');
  };

})(jQuery);
