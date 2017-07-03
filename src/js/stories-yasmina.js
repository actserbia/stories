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



  var $brands = $('.header-story');
  var apiPrefix = "";
  var apiUrls = [];
  var storiesAll = [];
  var $storiesRendered = $("<div class='all-st-wrapper'></div>");
  var $GAEventRelay = $('.header-stories-in');



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
      var href = $(o).data('href');
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

   // SETTING data('href')
   $brands.each(function (i, o) {
     var $o = $(o);
     $o.data('href', dce64($o.attr('rel'))); // keep href in data to prevent too early click
   });


   // ADD STORY IF REQUIRED BUT NOT ON HEADER STORYES MENU
   var lHash = decodeURI(decodeURI(decodeURI(decodeURI(location.hash))));
   if (!!location.hash && lHash.indexOf("/story/") !== -1) {
     var hashHref = lHash.replace(/^[#]/, "");
     var exist = false;
     $brands.each(function(i, brand){
       $brand = $(brand);
       if(  $brand.data('href') === hashHref  ) {
         exits = true;
       }
     });
     if (!exist) {
       var $extraStory = $("<a href='#' style='display:none;' class='header-story' data-href='" + hashHref + "'></a>");
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
         var storie = storieAjaxed[0];
         try {
           storie.logo = $brands.eq(i).find('svg image').attr('xlink:href') ||
           imgSrc({hash: storie.sponsors[0].elements[0].data.hash}, {resizeWidth: 50});
         }
         catch(e) {
           storie.logo = "/assets/images/icons/apple-touch-icon-57x57.png";
         }
         storie.storieIndex = i;
         storie.designator = $brands.eq(i).data('href');
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
         $brands.each(function (i, o) {
           var $o = $(o);
           $o.attr('href', "#" + $o.data('href'));
         });
         ///////

         // GO GO GO
         var onAllImageLoaded = function(){
           $storiesRendered.stories();
           ///////
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
