var route = function(handle, pathname, request, response) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](request, response);
  } else {
    response.writeHead(404, {'Content-Type':'text/plain'});
    response.write('Page failed');
    response.end();
  }
};

exports.route = route;