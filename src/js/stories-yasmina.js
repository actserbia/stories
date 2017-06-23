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
  //var apiPrefix = "http://192.168.0.111:8085/";
  //var apiPrefix = "src/test-api";
  var apiPrefix = "";
  var apiUrls = [];
  var storiesAll = [];
  var $storiesRendered = $("<div class='all-st-wrapper'></div>");







  if ($('html').hasClass('ua-type-mobile')) {
    $brands.each(function (i, o) {
      var $o = $(o);
      //$o.attr('href', "#" + dce64($o.attr('rel')));
      $o.data('href', dce64($o.attr('rel')));
    });
  }










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
  var setImgSrc = function (obj) {
    var dfd = $.Deferred();
    var data = obj.data;
    var thumborConfig = $.extend(true, {}, window.appThumborConfig, {thumbor: {
        hasResize: true,
        hasTrim: false,
        isSmart: true,
        resizeWidth: "640",
        resizeHeight: "0"
      }});
    var thumbor = new thumborUrlBuilder(thumborConfig);
    thumbor.setAmazonUrlPath(thumborConfig.amazonS3Path, data);
    obj.imgSrc = thumbor.finalUrl();
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

  // A J A X I N G, REQUESTING/SETTING   A N D   R E N D E R I N G  (FIRST THING TO DO)
  getAllData().always(function (storiesAjaxed) {
    var mediaElementSetters = [];
    $.each(storiesAjaxed, function (i, storieAjaxed) {
      var storie = storieAjaxed[0];
      storie.logo = $brands.eq(i).find('svg image').attr('xlink:href');
      storie.storieIndex = i;
      storie.stUrl = $brands.eq(i).attr('href');
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
        $o.attr('href', "#" + dce64($o.attr('rel')));
      });

      ///////
      $('.all-st-wrapper').stories({apiPrefix: 'src/test-api', $eventColector: $('.header-stories-in')});
      $brands.one('click', function (ev) {
        ev.preventDefault();
        var $this = $(this);
        try {
          _stories.prePlayVideos($('.all-st-wrapper')).always(function () {
            var hash = $this.attr('href');
            location.hash = hash;
          });
        } catch (e) {
        }
      });
      ///////
      

    });
  });








  _stories.log("STORIES :: " + 'stories plugin loaded');


  //};


})(jQuery);
