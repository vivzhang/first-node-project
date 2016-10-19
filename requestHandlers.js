var fs = require('fs');

function start(request, response) {
  // var getRequest = '<script>' + "$('#submitButton').on('click', function() { $.get('text.txt', function(data) { $('body').append(data) }) })" + '</script>';
  // var body = "<html><head><script src='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'></script></head>" +
  //   "<body><input type='submit' id='submitButton'>" + getRequest + "</body></ht";

  var body = "<html><body><form action='/show' method='post'>"+
  "<input type='text' name='key' />" +
  "<input type='submit' value='Submit'></form></body></html>"
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function show(request, response) {
  var postData = "";
  var key;
  request.addListener("data", function(postDataChunk) {
  	postData += postDataChunk;
  });
  request.addListener("end", function() {
  	key = postData.slice(4);
  })
  response.writeHead(200, {"Content-Type": "text/html"});
  fs.readFile("./text.txt", function(error, contents) {
    if (error) {
      throw error;
    }
    var temp = contents.toString();
    var content = JSON.parse(temp);
    response.write(content[key]);
    response.end();
  });
}

exports.start = start;
exports.show = show;
