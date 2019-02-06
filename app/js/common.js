/*!
 * JSWebserviceMonitoring
 * Copyright 2019 nisasche
 * Licensed under MIT (https://github.com/nisasche/JSWebserviceMonitoring/blob/master/LICENSE)
 */

//Function HTML Templates
module.exports = {

  getTestUris: function (settings) {

  var urls = [];
  var index = 1;
  settings.application.forEach(element => {

    if (element.kontext ===  null) {
        var iProd = 0;
        for (;element.PROD.url[iProd];){
            urls.push( module.exports.getTestUri(index,element.name,element.PROD.url[iProd]));
            iProd++;
            index++;
        }
        var iTest = 0;
        for (;element.TEST.url[iTest];) {
            urls.push( module.exports.getTestUri(index,element.name,element.TEST.url[iTest]));
            iTest++;
            index++;
        }

    } else {
        var ikon = 0;
        for (;element.kontext[ikon];) {
            var iKontextProd = 0;
            for (;element.PROD.url[iKontextProd];){
                urls.push( module.exports.getTestUri(index,element.name,element.PROD.url[iKontextProd]+element.kontext[ikon]));
                iKontextProd++;
                index++;
            }
            var iKontextTest = 0;
            for (;element.TEST.url[iKontextTest];) {
                urls.push( module.exports.getTestUri(index,element.name,element.TEST.url[iKontextTest]+element.kontext[ikon]));
                iKontextTest++;
                index++;
            }
          ikon++;
        }   
    }

  });
return urls;
},

getTestUri: function (id,appName,url) {
  var testuri = {}; 
      testuri["id"] = id,
      testuri["name"] = appName,
      testuri["uri"] = url;
  return testuri;
}

};