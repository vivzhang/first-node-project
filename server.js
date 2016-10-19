var http = require('http');
var url = require('url');

var start = function(route, handle) {
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    route(handle, pathname, request, response);
  }).listen(8888);
  console.log('Server has started');
};

exports.start = start;
