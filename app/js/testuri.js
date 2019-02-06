/*!
 * JSWebserviceMonitoring
 * Copyright 2019 nisasche
 * Licensed under MIT (https://github.com/nisasche/JSWebserviceMonitoring/blob/master/LICENSE)
 */
//import { getTesturis } from 'app/js/common';
var urls = [];
var filePathTestUri = 'app/js/testuri.json'; 
var common = require('./common');

var fs = require('fs');

  var settings = fs.readFileSync('settings.json');

  var jsonSettings = JSON.parse(settings);

    urls =  common.getTestUris(jsonSettings);
/*
  jsonSettings.application.forEach(element => {

    if (element.kontext ===  null) {
        var iProd = 0;
        for (;element.PROD.url[iProd];){
            urls.push( getTestUri(element.name,element.PROD.url[iProd]));
            iProd++;
        }
        var iTest = 0;
        for (;element.TEST.url[iTest];) {
            urls.push( getTestUri(element.name,element.TEST.url[iTest]));
            iTest++;
        }

    } else {
        var ikon = 0;
        for (;element.kontext[ikon];) {
            var iKontextProd = 0;
            for (;element.PROD.url[iKontextProd];){
                urls.push( getTestUri(element.name,element.PROD.url[iKontextProd]+element.kontext[ikon]));
                iKontextProd++;
            }
            var iKontextTest = 0;
            for (;element.TEST.url[iKontextTest];) {
                urls.push( getTestUri(element.name,element.TEST.url[iKontextTest]+element.kontext[ikon]));
                iKontextTest++;
            }
          ikon++;
        }   
    }


  });
  */



var request = require('request');

var json = {'result':[]};

console.log(urls);
urls.sort();
urls.forEach(url => {
  
        request({ method: 'HEAD', uri: url.uri }, function(error, response, body) {

            var date;
            var statusCode;
            var statusMessage;
            if (error) {
                statusCode = 0;
                statusMessage = error.errno;
                console.log(error);
            } else {
                date = response.headers.date;
                statusCode = response.statusCode;
                statusMessage = response.statusMessage;
            }
            var jsonData = {
                "id": url.id,
                "name": url.name,
                "uri": url.uri,
                "date": date,
                "statusCode": statusCode,
                "statusMessage": statusMessage
            };

            json.result.push(jsonData);
            console.log(json);

            if (fs.existsSync(filePathTestUri)) {
                fs.unlinkSync(filePathTestUri);
            }
            fs.appendFileSync(filePathTestUri, JSON.stringify(json));

        });
    
});


function getTestUri(appName,url) {
    var testuri = {}; 
        testuri['name'] = appName,
        testuri['uri'] = url;
    return testuri;
}