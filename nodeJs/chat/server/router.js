/**
 * Long-Polling chat demo with Node.js
 *
 * @author Sascha Feldmann
 */

var template = require('./template'),
    url = require('url'),
    chat = require('./chat');

/**
 * The matches methods checks an URL and performs a specified action.
 *
 * @param request
 * @param response
 */
exports.matches = function (request, response) {
    var urlParts = url.parse(request.url);

    var renderCallbackFunction = function(content) {
        response.end(content);
    };

    if ('/' == urlParts.pathname) {
        template.simpleRender('./static/index.html', renderCallbackFunction);
    }
    else if ('/js/chat.js' == urlParts.pathname) {
        template.simpleRender('./static/js/chat.js', renderCallbackFunction);
    }
    else if ('/poll/' == urlParts.pathname.substr(0, 6)) {
        var count = urlParts.pathname.substr(6);
        console.log('Getting a poll request with count ' + count);
        chat.poll(count, response);
    }
    else if ('/msg/' == urlParts.pathname.substr(0, 5)) {
        var message = unescape(urlParts.pathname.substr(5));
        console.log('Getting a message request with message ' + message);
        chat.recieveMessage(message, response);
    }
    else {
        template.simpleRender('./static/404.html', renderCallbackFunction);
    }
};