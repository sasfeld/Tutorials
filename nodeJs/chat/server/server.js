/**
 * Long-Polling chat demo with Node.js
 *
 * @author Sascha Feldmann
 */

var http = require('http'),
    router = require('./router');

settings = require('./settings');

/**
 * Start the server immediatly.
 */
exports.start = function () {
    http.createServer(function (request, response) {
        // delegate request to router
        router.matches(request, response);
    }).listen(settings.configuredPort, settings.configuredHost);

    console.log('Server is up and running on ' + settings.configuredHost + ':' + settings.configuredPort);
}

exports.setContentCallback = function (contentToSet) {
    displayContent = contentToSet;
}

