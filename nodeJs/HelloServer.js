/**
 * Created by slash1990 on 15.10.2014.
 */

var http = require('http');

var content = 'Hello World';

http.createServer(function (request, response) {
    response.end(content);
}).listen(8081, 'localhost');

console.log('Server up and running on http://localhost:8080');