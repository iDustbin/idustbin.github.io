$(document).ready( function() {
  
    var data = {
      rss_url: 'https://medium.com/feed/@idustbin'
    };
    
    $.getJSON('https://api.rss2json.com/v1/api.json', data, function(response) {
      var title = [];
      var link = [];
      var description = [];
      for(var i = 0; i < response['items'].length; i++) {
        var catLength = response['items'][i]['categories'].length
        if(catLength > 0) {
            title.push(response['items'][i]['title']);
            link.push(response['items'][i]['link']);
            description.push(response['items'][i]['description']);
        }
      }
      // console.log(description)
      for(var x = 0; x < 3; x++) {
        var shortStrIndx = description[x].indexOf('<p>');
        var newShortStr = description[x].substr(shortStrIndx, 80);
        $('.jsonContent').append('<a href="' + link[x] + '"><h5>'+ title[x] +'</h5></a><p>' + newShortStr +  '...</p><hr>')
      }
    })
    
  })