/*
*
* Author: Diwanee :: Aleksandar Veljkovic :: coa.develop@gmail.com
*
* LIFE CICLE
* 1. Ajax
* 2. Render
*   -- user click
* 3. Preplay
* 4a. Opened
* 4b. Closed
*
*/


'use strict'
;(function($){



  // handlebars helpers
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


  $.fn.stories = function(set) {

    set = set || {};
    var $eventColector = set.$eventColector || $(document);
    var $brands = $(this);
    //var apiPrefix = "http://192.168.0.111:8085/";
    //var apiPrefix = "src/test-api";
    var apiPrefix = set.apiPrefix || "";
    var apiUrls = [];
    var storiesAll = [];
    var $storiesRendered = $("<div class='all-st-wrapper'></div>");
    var timeoutNext = 0;
    var timeoutNextT = 3000;
    //var storiesData = [];


    /*
    *
    *  R E Q U E S T S  /  MEDIA SETTERS
    *
    */

    var getStoryTitle = function(index) {
      return storiesAll[index].data.article_title;
    };

    // REQUEST SINGLE ARTICLE
    var request = function(apiUrl, unique){
      _stories.log("STORIES :: " + "requesting: " + apiUrl);
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
        var href = $(o).attr('href');
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
            if (o.type === 'video/h264' && (/(.mp4)/).test(o.src) && !o.isOriginal) {
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





    /*
    *
    *  R U N E R S
    *
    */

    // A J A X I N G, REQUESTING/SETTING   A N D   R E N D E R I N G  (FIRST THING TO DO)
    getAllData().always(function(storiesAjaxed){
      var mediaElementSetters = [];
      $.each(storiesAjaxed, function(i, storieAjaxed){
        var storie = storieAjaxed[0];
        storie.logo = $brands.eq(i).find('svg image').attr('xlink:href');
        storie.storieIndex = i;
        storie.stUrl = $brands.eq(i).attr('href');
        storiesAll.push(storie);
        mediaElementSetters.push(setArticleMedia(storie));
      });
      $.when.apply($, mediaElementSetters).always(function(){
        _stories.log("STORIES :: " + "AJAXing done");
        var storiesRendered = "";
        $.each(storiesAll, function(i, story){
          storiesRendered += stories.templates.storie(story, true);
        });
        $storiesRendered.append(storiesRendered);
        $('body').append($storiesRendered);
        $storiesRendered.addClass('st-rendered');
      });
    });


    function setHashSilently(hash, history){
      hasher.changed.active = false; //disable changed signal
      if (history) {
        hasher.setHash(hash);
      }
      else {
        hasher.replaceHash(hash);
      }
      hasher.changed.active = true; //re-enable signal
    }

    function handleChanges(newHash, oldHash){
      //console.log(newHash);
    }
    hasher.changed.add(handleChanges); //add hash change listener
    hasher.initialized.add(handleChanges); //add initialized listener (to grab initial value in case it is already set)
    hasher.init(); //initialize hasher (start listening for history changes)



    // STARTER
    $storiesRendered.on('preplayed', function(ev, storieIndex){
      _stories.log("STORIES :: " + 'preplayed, '+ storieIndex);
      _stories.log("STORIES :: " + "Starter first: " + storieIndex);
      $eventColector.trigger('stories-click', {index: storieIndex, title: getStoryTitle(storieIndex)});
      ev.stopPropagation();
      $storiesRendered.addClass('st-opened');
      $('.st-slider', $storiesRendered).each(function(i, slider){
        sliderArticle( $(slider) );
      });
      sliderWrapper($storiesRendered, storieIndex);
      $storiesRendered.find('.st-close').on('click', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        destroy();
      });
      /// reinitialize
      $brands.off('click')
      hasher.setHash("#")
      $brands.on('click', function(ev){
        hasher.setHash("#")
        ev.preventDefault();
        ev.stopPropagation();
        $this = $(this);
        var $brand = $this;
        var storieIndex = $brands.index($brand);
        _stories.log("STORIES :: " + "Starter restart: " + storieIndex);
        $eventColector.trigger('stories-click', {index: storieIndex, title: getStoryTitle(storieIndex)});
        $storiesRendered.addClass('st-opened');
        $storiesRendered.slick('slickGoTo', storieIndex, true);
        $(window).trigger('resize');
      });
    });


    $brands.on('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      _stories.log("STORIES :: " + 'CLICK Data');
      var $this = $(this);
      var $brand = $this;
      var storieIndex = $brands.index($brand);
      if (!$storiesRendered.hasClass('st-rendered') || $storiesRendered.hasClass('st-opened') || $storiesRendered.hasClass('st-preplay')) {
        return;
      }
      $storiesRendered.addClass('st-preplay');
      prePlayVideos($storiesRendered, storieIndex);
    });


    _stories.log("STORIES :: " + 'stories plugin loaded');


  };


})(jQuery);
