/**
 * thumbor factory service
 */

var thumborUrlBuilder = function(config) {
  var tthis = this;
  this.thumborSecurityKey = config.thumbor.thumborSecurityKey;
  this.thumborServerUrl = config.thumbor.thumborServerUrl;
  this.urlPath = config.thumbor.urlPath;
  this.hasResize = config.thumbor.hasResize;
  this.hasTrim = config.thumbor.hasTrim;
  this.isSmart = config.thumbor.isSmart;
  this.resizeWidth = config.thumbor.resizeWidth;
  this.resizeHeight = config.thumbor.resizeHeight;
  this.fitIn = config.thumbor.fitIn;


  this.setAmazonUrlPath = function(amazonS3Path, scope){
    tthis.urlPath = amazonS3Path + 'image_source' + '/' + scope.hash.substr(0, 2) + '/' + scope.hash.substr(2, 2) + '/' + scope.hash + '.jpg';
  };

  this.setUrlPath = function(urlPath) {
    tthis.urlPath = (urlPath.charAt(0)) == '/' ? urlPath.substring(1, urlPath.lenght) : urlPath;
    return this;
  };

  this.resize = function(width, height) {
    tthis.hasResize = true;
    tthis.resizeWidth = width;
    tthis.resizeHeight = height;
    return this;
  };

  this.trim = function(x1, y1, x2, y2) {
    tthis.hasTrim = true;
    tthis.trimX1 = x1;
    tthis.trimY1 = y1;
    tthis.trimX2 = x2;
    tthis.trimY2 = y2;
    return this;
  };

  this.smart = function(smart) {
    tthis.isSmart = true;
    return this;
  };

  this.finalUrl = function() {

    var operation = '';

    if (tthis.hasResize) {
      operation = operation + tthis.resizeWidth + 'x' + tthis.resizeHeight + '/';
    }

    if (tthis.hasTrim) {
      operation = operation + tthis.trimX1 + 'x' + tthis.trimY1 + ':' + tthis.trimX2 + 'x' + tthis.trimY2 + '/';
    }

    if (tthis.isSmart) {
      operation = operation + 'smart/';
    }
    
    if (tthis.fitIn) {
      operation = operation + 'fit-in/' + tthis.fitIn.E + 'x' + tthis.fitIn.F + '/';
    }

    if (tthis.thumborSecurityKey) {

      var shaObj = new jsSHA(operation + tthis.urlPath, 'TEXT');
      var key = shaObj.getHMAC(tthis.thumborSecurityKey, 'TEXT', 'SHA-1', 'B64');
      key = key.replace(/\+/g, "-").replace(/\//g, "_");

      return tthis.thumborServerUrl + '/' + key + '/' + operation + tthis.urlPath;

    } else {
      return tthis.thumborServerUrl + '/unsafe/' + operation + tthis.urlPath;
    }
  };
};
