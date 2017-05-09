this["stories"] = this["stories"] || {};
this["stories"]["templates"] = this["stories"]["templates"] || {};
this["stories"]["templates"]["wrapper"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"st-wrapper\">\n\n  <div class=\"st-header\">\n\n    <span class=\"st-close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\">\n        <line x1=\"0\" y1=\"0\" x2=\"50\" y2=\"50\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n        <line x1=\"0\" y1=\"50\" x2=\"50\" y2=\"0\" style=\"stroke:rgb(255,255,255);stroke-width:1\" />\n      </svg>\n    </span>\n\n    <span class=\"st-logo\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\">\n        <defs>\n          <clipPath id=\"s-clipCircle\">\n            <circle r=\"50\" cx=\"50\" cy=\"50\"></circle>\n          </clipPath>\n        </defs>\n        <polygon points=\"0,0 0,100 100,100 100,0\" clip-path=\"url(#s-clipCircle)\" style=\"fill:white;\" />\n        <image x=\"0\" y=\"0\" clip-path=\"url(#s-clipCircle)\" width=\"100\" height=\"100\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\""
    + alias4(((helper = (helper = helpers.logo || (depth0 != null ? depth0.logo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data}) : helper)))
    + "\"></image>\n        <circle cx=\"50\" cy=\"50\" r=\"46\" stroke=\"white\" stroke-width=\"3\" fill=\"none\"></circle>\n        <circle cx=\"50\" cy=\"50\" r=\"49\" stroke=\"#9e914c\" stroke-width=\"2\" fill=\"none\"></circle>\n      </svg>\n    </span>\n\n    <h3>"
    + alias4(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.sponsors : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.data : stack1)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n\n  </div>\n\n\n  <main>\n    <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.elements : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n    "
    + alias4(((helper = (helper = helpers.main || (depth0 != null ? depth0.main : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"main","hash":{},"data":data}) : helper)))
    + "\n  </main>\n\n\n\n\n  <div class=\"storie-ui-left\"></div>\n  <div class=\"storie-ui-right\"></div>\n\n</div>\n";
},"useData":true});
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
