/*
 * JSWebserviceMonitoring
 * Copyright 2019 nisasche
 * Licensed under MIT (https://github.com/nisasche/JSWebserviceMonitoring/blob/master/LICENSE)
 */
//import { getTesturis } from 'app/js/common';

 var bust = Math.random();    


    $.getJSON('settings.json?bust=' + bust, function(data) {
        //console.log(data);

        var settings = data;
        setInterval(data.refreshInterval);
          
        if(settings.application.length === 0) {
          $('#lastTestDate').addClass('alert-danger');
          $('#lastTestDate').text('No application found in settings.json. Please configure your application in settings.json!'); 
        }


          settings.application.forEach(element => {
            navItem(element.name);
            pills(element.name);
            pillsH4(element.name,'Production');
            pillsH4(element.name,'Test');
            statusApp(element.name);
            var appStatus = 'success'; //warning, danger
            var failedUris = [];
          
           var urisToTest =  getTesturis(settings);
           var enviroment;
           var itemStatus;

           urisToTest.forEach(elementUri => {
            
            enviroment = isTest(element, elementUri.uri);
            
            if ($('a[href*="'+elementUri.uri+'"]').length < 1) {

              alertItem('alertItem'+elementUri.id,elementUri.name+enviroment,elementUri,'danger');
              
            }

          });

            $.getJSON('app/js/testuri.json?bust=' + bust, function(data) {
              var testuri = data;

              if(testuri.result.length === 0) {
                $('#lastTestDate').addClass('alert-danger');
                $('#lastTestDate').text('No tested application found in testuri.json. Please make sure testuri.js worksfine on your backend!'); 
              }

              testuri.result.forEach(item => {
                enviroment = isTest(element, item.uri);
                itemStatus = getItemStatus(item.statusCode,element.statusOk,enviroment);
  
                if ($('a[href*="'+item.uri+'"]').length === 1) {
                  
                  //console.log(item);
                  $('#refalertItem'+item.id).text(item.uri+' => '+item.statusMessage+' ('+item.statusCode+')');
                  $('#alertItem'+item.id).removeClass('alert-danger alert-warning alert-success');
                  $('#alertItem'+item.id).addClass('alert-'+itemStatus);   
              
                  if('success' !== itemStatus && enviroment === 'Test' &&  appStatus !== 'danger') {
                    appStatus = 'warning';
                    failedUris.push(item.uri);
                  } else if ('success' !== itemStatus && enviroment === 'Production') {
                    appStatus = 'danger';
                    failedUris.push(item.uri);
                  }

                  if (item.date !== undefined) {
                    $('#lastTestDate').text(item.date); 
                  }
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
      
      bust = Math.random();

      setTimeout(function(){ 
          autoRefresh();
        }, getInterval()); 

      setTimeout(function() {
          var navbarHeigth = $('.navbar').css('height');
          $('.tab-content').css('margin-top',navbarHeigth);
      }, 100);
