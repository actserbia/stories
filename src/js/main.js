;(function($){
  $.fn.stories = function() {

    var $context = $(this);
    var $brands = $context.children('div');
    var $clickers = $("a", $context);

    //var apiPrefix = "http://192.168.0.111:8085/";
    var apiPrefix = "http://localhost/bower_components/stories/src/test-api";

    var apiUrls = [];
    var storiesData = [];


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


    $clickers.on('click', $context, function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      var $brand = $(this).parent();
      var storieIndex = $brands.index($brand);
      getAllData().always(function(storiesData){
        //console.log(storiesData);
        var storieData = storiesData[storieIndex][0];
        storieData.logo = $brand.find('image').attr('xlink:href');
        render(storieData);
      });
    });


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



    var setKalturaSrcs = function(obj){
      var dfd = $.Deferred();
      var vID = obj.data.remote_id
      kWidget.getSources({
        'partnerId': 676152,
        'entryId': vID,
        'callback': function(data){
          obj.vKaltura = data;
          dfd.resolve(obj);
        }
      });
      return dfd.promise();
    }


    var render = function(storieData){
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
        console.log('-------');
        console.log(arguments);
      });

      //console.log(storieData);


      //console.log( getImgSrc(storieData.elements[0].data)  );




      //console.log(storieData.sopnsors[0]data.name);

      var $storie = $(stories.templates.wrapper(storieData, true));
      $(".st-close", $storie).on('click', function(){
        $storie.remove();
      })
      $('body').append($storie);
    }

  };
})(jQuery);
