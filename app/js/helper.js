/*!
 * JSWebserviceMonitoring
 * Copyright 2019 nisasche
 * Licensed under MIT (https://github.com/nisasche/JSWebserviceMonitoring/blob/master/LICENSE)
 */

//Function HTML Templates

function navItem(name) {
  $('#pills-tab').append('<li id="'+name+'" class="nav-item"><a class="nav-link" id="pills-'+name+'-tab" data-toggle="pill" href="#pills-'+name+'" role="tab" aria-controls="pills-'+name+'" aria-selected="false">'+name.toUpperCase()+'</a></li>');
} 

function statusApp(name){
  $("#homeStatus").append('<div id="status'+name+'" class="alert" role="alert">'+name.toUpperCase()+'</div>');
}

function alertLinks(name, problem) {
  $('#status'+name).append('<a class="alert-link"  data-toggle="collapse" href="#'+name+'links" aria-expanded="false" aria-controls="'+name+'links">'+name.toUpperCase()+' => SYSTEM PROBLEM</a><div class="collapse" id="'+name+'links"><div class="card card-body" id="card'+name+'"> </div></div>');
}

function alertLinksUris(name, uris) {
  
  uris.forEach(element => {
    $('#card'+name).append('<a href="'+element+'" target="_blank">'+element+'</a>');
  });

}

function pills(name){
  $("#pills-tabContent").append('<div class="tab-pane fade row justify-content-md-center" id="pills-'+name+'" role="tabpanel" aria-labelledby="pills-'+name+'-tab"></div>');
}

function pillsH4(name,h4) {
  $('#pills-'+name).append('<div class="col-md-auto"><h4 class="tabHeader">'+h4+'</h4><div id='+name+h4+'></div></div>');
}

function alertItem(id,appendId,uriData,appStatus) {

  var status = (uriData.statusMessage === undefined) ? 'on test': uriData.statusMessage+' ('+uriData.statusCode+')';
    $('#'+appendId).append('<div id="'+id+'" class="alert alert-'+appStatus+'" role="alert"><a id="ref'+id+'" href="'+uriData.uri+'" target="_blank" class="alert-link">'+uriData.uri+' => '+status+'</a></div>');

 }


//App Function

function getItemStatus(statusCode, statusOk, test) {
  var status = 'danger';
  if (statusCode === statusOk) {
    status = 'success';
  } else if (test === 'Test') {
    status = 'warning';
  }
  return status;
}

function isTest(settingsApp, checkuri) {
  var enviroment;
  if(checkuri.search(settingsApp.TEST.url) === 0) {
    enviroment = 'Test';
  } else if(checkuri.search(settingsApp.PROD.url) === 0) {
    enviroment = 'Production';
  }
  return enviroment;
}

function setInterval(interval) {
  localStorage.setItem('interval', interval);
}

function getInterval() { 
    return localStorage.getItem('interval') * 1000; //sec to millisec
  }
  
  
function autoRefresh(){
          if ($('#autoRefresh').is(':checked')) { 
            location.reload(true);
          }
}


function getTesturis(settings) {

  var urls = [];
  var index = 1;
  settings.application.forEach(element => {

    if (element.kontext ===  null) {
        var iProd = 0;
        for (;element.PROD.url[iProd];){
            urls.push( getTestUri(index,element.name,element.PROD.url[iProd]));
            iProd++;
            index++;
        }
        var iTest = 0;
        for (;element.TEST.url[iTest];) {
            urls.push( getTestUri(index,element.name,element.TEST.url[iTest]));
            iTest++;
            index++;
        }

    } else {
        var ikon = 0;
        for (;element.kontext[ikon];) {
            var iKontextProd = 0;
            for (;element.PROD.url[iKontextProd];){
                urls.push( getTestUri(index,element.name,element.PROD.url[iKontextProd]+element.kontext[ikon]));
                iKontextProd++;
                index++;
            }
            var iKontextTest = 0;
            for (;element.TEST.url[iKontextTest];) {
                urls.push( getTestUri(index,element.name,element.TEST.url[iKontextTest]+element.kontext[ikon]));
                iKontextTest++;
                index++;
            }
          ikon++;
        }   
    }

  });
return urls;
}

function getTestUri(id,appName,url) {
  var testuri = {}; 
      testuri["id"] = id,
      testuri["name"] = appName,
      testuri["uri"] = url;
  return testuri;
}
