/*!
 * JSWebserviceMonitoring
 * Copyright 2019 nisasche
 * Licensed under MIT (https://github.com/nisasche/JSWebserviceMonitoring/blob/master/LICENSE)
 */

var urls = [];
var filePathTestUri = 'testuri.json'; 

var fs = require('fs');

var intervalJson = fs.readFileSync('settings.json');
var interval = intervalJson.refreshIntervalSec;

setTimeout(function(){ 

  var settings = fs.readFileSync('settings.json');

  var jsonSettings = JSON.parse(settings);
  var interval = jsonSettings.refreshIntervalSec;
  console.log(interval);


  jsonSettings.application.forEach(element => {
     
    var uriobj = {};

    if (element.kontext ===  null) {
        uriobj['name'] = element.name,
        uriobj['uri'] = element.PROD.url;
        urls.push(uriobj); 
        uriobj = {};
        uriobj['name'] = element.name,
        uriobj['uri'] = element.TEST.url;
        urls.push(uriobj);
        uriobj = {}; 
    } else {
        var i = 0;
        for (;element.kontext[i];) {
            uriobj['name'] = element.name,
            uriobj["uri"] = element.PROD.url + element.kontext[i];
            urls.push(uriobj); 
            uriobj = {};
            uriobj['name'] = element.name,
            uriobj['uri'] = element.TEST.url +element.kontext[i];
            urls.push(uriobj); 
            uriobj = {};
          i++;
        }   
    }

  });



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


}, interval); //Set Timeout
