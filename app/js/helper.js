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
  $("#pills-tabContent").append('<div class="tab-pane fade" id="pills-'+name+'" role="tabpanel" aria-labelledby="pills-'+name+'-tab"></div>');
}

function pillsH4(name,h4) {
  $('#pills-'+name).append('<h4 class="tabHeader">'+h4+'</h4><div id='+name+h4+'></div>');
}

function alertItem(appendId,uriData,appStatus) {
  $('#'+appendId).append('<div class="alert alert-'+appStatus+'" role="alert"><a href="'+uriData.uri+'" target="_blank" class="alert-link">'+uriData.uri+' => '+uriData.statusMessage+' ('+uriData.statusCode+')</a></div>');
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

function getInterval() {
    var interval =  $('#interval').val();
    localStorage.setItem("interval", interval);
    return interval * 1000; //sec to millisec
  }
  
  
function autoRefresh(){
          if ($('#autoRefresh').is(':checked')) { 
            location.reload(true);
          }
}