;(function($){
  $.fn.stories = function() {

    var $brands = $(this).children('div');
    var $clickers = $("a", $(this));

    //var apiPrefix = "http://192.168.0.111:8085/";
    var apiPrefix = "src/test-api";

    var apiUrls = [];
    var storiesAll = [];
    var $storiesRendered = $();
    //var storiesData = [];

    // PRELOADER
    $(document).ready(function(ev){
      getAllData().always(function(storiesAjaxed){
        var mediaElementSetters = [];
        $.each(storiesAjaxed, function(i, storieAjaxed){
          var storie = storieAjaxed[0]
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
        });
      });
    });


    // STARTER
    $clickers.on('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      $this = $(this)
      if ($storiesRendered.length < 1 || $storiesRendered.hasClass('opened')) {
        return;
      }
      prePlayVideos($storiesRendered);
      $storiesRendered.addClass('opened');
      var $brand = $this.parent();
      var storieIndex = $brands.index($brand);
      sliderWrapper($storiesRendered, storieIndex);
      $('.st-slider', $storiesRendered).each(function(i, slider){
        sliderArticle( $(slider) );
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

    // SLIDER INTI Article
    var sliderArticle = function($el){
      var $slides = $el.find('.item');
      $el.on('beforeChange', function(ev, slick, currentSlide, nextSlide){
          ev.stopPropagation();
          ev.preventDefault();
          //var $next = (nextSlide) ? slick.$slides.eq(nextSlide) : slick.$slides.eq(0);
          //var activeStory = $next.parents('.st-wrapper.slick-active');
          //console.log('as bc');
           //console.log($next.find('video'));

          rewindVideos($storiesRendered);
          $nextItem = slick.$slides.eq(nextSlide);





          if (!!$nextItem.find('video').length) {
            console.log('as bc V');


            //$next.find('video')[0].currentTime = 0;
            $nextItem.find('video')[0].play();
          }

      });

      $el.on('afterChange', function(ev, slick, nextSlide){
        ev.stopPropagation();
        ev.preventDefault();
        $nextItem = slick.$slides.eq(nextSlide);
        $nextItem.addClass('slick-active').addClass('slick-current');
      });

      $slides.on('click', function(ev){
        ev.stopPropagation();
        console.log('xx');
        next($el);
      });
      $el.slick({
        arrows: false,
        infinite: false,
        adaptiveHeight: false,
        mobileFirst: true,
        fade: true,
        swipe: false,
      });
    }

    // SLIDER INIT WRAPPER
    var sliderWrapper = function($el, initialSlide){

      $el.on("init", function(ev, slick){
        console.log("w Init");
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
        initialSlide: initialSlide
      });
      $el.on("beforeChange", function(ev, slick, currentSlide, nextSlide){
        ev.stopPropagation();
        ev.preventDefault();
        var $nextStoryeSlider =  slick.$slides.eq(nextSlide).find('.slick-slider').slick('slickGoTo', 0);
        $nextStoryeSlider.slick('slickGoTo', 0);
      });
      $el.on("afterChange", function(ev, slick, currentSlide){
        ev.stopPropagation();
        ev.preventDefault();
        console.log( 'wac' );
      });
    }

    var next = function($childSlider){
      var $childItems = $childSlider[0].slick.$slides;
      if (!$childItems.last().hasClass('slick-active')) {
        $childSlider.slick('slickNext');
      }
      else {
        nextParent($childSlider);
      }
    };

    var nextParent = function($childSlider){
      var $parentSlider = $childSlider.parents('.slick-slider');
      var $parentItems = $parentSlider[0].slick.$slides;
      if (!$parentItems.last().hasClass('slick-current')) {
        $parentSlider.slick('slickNext');
      }
      else {
        destroy();
      }
    };

    var destroy = function(){
      $storiesRendered.removeClass('opened');
      $storiesRendered.find('.st-slider').each(function(i,storieSlider){
        $(storieSlider).slick('unslick');
      });
      $storiesRendered.slick('unslick');
    }

    // PREPLAY VIDEOS TO FIX AUTOPLAY
    var prePlayVideos = function($context){
      $('video', $context).each(function(i, vid){
        $(vid).one('timeupdate', function(ev){
          ev.stopPropagation();
          console.log('v timeupdate')
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

  };
})(jQuery);
