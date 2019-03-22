"use strict";
var sys = require("system");
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');

var args = sys.args;
page.open('https://map.naver.com/', function(status) {
    var text = page.evaluate(function(arg) {
        var result;
        var category = arg[1];
        $.ajax({
            async: false,
            cache: false,
            dataType:"json",
            type: 'GET',
            url: "https://map.naver.com/search2/local.nhn?sm=hty&searchCoord=127.0480405%3B37.5241001&isFirstSearch=true&query=%ED%94%BC%EC%9E%90&menu=location&mpx=09680104%3A37.5241001%2C127.0480405%3AZ8%3A0.0432273%2C0.0818940",
            data: ({category: category}),
            success: function(data) {
              var a = {};
              for (var i=0; i <data.result.site.list.length; i++){
                a[i]= data.result.site.list[i]
              }
              result = a;
            }
        });
        return result;
    }, args);
    console.log(text);
    // fs.appendFile('mydownloadedfile.csv', 'text');
    fs.write('aaa.csv', JSON.stringify(text))
    phantom.exit();
});

page.onConsoleMessage = function(msg){
  console.log("remote> " + msg);
};

// page.onResourceReceived = function(response) {
//   console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
// };

page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
  phantom.exit();
};

page.onResourceTimeout = function(request) {
  console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
};