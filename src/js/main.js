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
