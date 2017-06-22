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

  return "          <div class='item item-kaltura'>\n\n              <video poster=\"\" preload=\"none\" playsinline>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.vKaltura : depth0)) != null ? stack1.sources : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </video>\n\n          </div>\n";
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

  return "<div class=\"st-wrapper\">\n\n\n\n\n  <div class=\"st-header\">\n\n    <div class=\"dots-wrapp\"></div>\n\n    <div class=\"st-close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\">\n        <line x1=\"0\" y1=\"0\" x2=\"50\" y2=\"50\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n        <line x1=\"0\" y1=\"50\" x2=\"50\" y2=\"0\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n      </svg>\n\n    </div>\n\n    <div class=\"st-logo\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\">\n        <defs>\n          <clipPath id=\"s-clipCircle-"
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
          // not implemented 
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
