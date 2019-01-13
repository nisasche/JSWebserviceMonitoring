/*!
 * JSWebserviceMonitoring
 * Copyright 2019 nisasche
 * Licensed under MIT (https://github.com/nisasche/JSWebserviceMonitoring/blob/master/LICENSE)
 */
    
    $.getJSON('settings.json', function(data) {
        //console.log(data);
        var settings = data;
          
          settings.application.forEach(element => {
            navItem(element.name);
            pills(element.name);
            pillsH4(element.name,'Production');
            pillsH4(element.name,'Test');
            statusApp(element.name);
            var appStatus = 'success'; //warning, danger
            var failedUris = [];
  
            $.getJSON('testuri.json', function(data) {
  
              var testuri = data;
              var enviroment;
              var itemStatus;
  
              testuri.result.forEach(item => {
                enviroment = isTest(element, item.uri);
                itemStatus = getItemStatus(item.statusCode,element.statusOk,enviroment);
  
                if ($('a[href*="'+item.uri+'"]').length < 1) {
                  
                  alertItem(item.name+enviroment,item,itemStatus);
                  
                  if('success' !== itemStatus && enviroment === 'Test' &&  appStatus !== 'danger') {
                    appStatus = 'warning';
                    failedUris.push(item.uri);
                  } else if ('success' !== itemStatus && enviroment === 'Production') {
                    appStatus = 'danger';
                    failedUris.push(item.uri);
                  }
                  console.log(itemStatus + ' '+ item.uri);
                  console.log(failedUris);
                  //alert(failedUris);
            
                }
  
                
              }); // testuri.forEach(item 
  
              $('#status'+element.name).addClass('alert-'+appStatus);
  
              if('success' !== appStatus){
                $('#status'+element.name).text('');
                alertLinks(element.name);
                alertLinksUris(element.name, failedUris);
              } 
  
            }); //testuri.json'
  
          }); //settings.application.forEach(element
   
      }); //settings.json
  
      var interval = localStorage.getItem('interval') === null ?  5 : localStorage.getItem('interval');
      $('#interval').val(interval);
      setTimeout(function(){ 
          autoRefresh();
        }, getInterval()); 