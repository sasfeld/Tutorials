/**
 * Long-Polling chat demo with Node.js
 *
 * @author Sascha Feldmann
 */

var messages = [];
var clientResponses = [];

/**
 * Long-Polling:
 *
 * the client has to call the poll method after he was initialized.
 *
 * He has to send his initial count number 0.
 *
 * If there are messages with a higher count, response all of them.
 *
 * Otherwise, we will save the response object of client so that we can send a response later (after another client added a message).
 *
 * @param clientCount the client's current messages number
 * @param response
 */
exports.poll = function(clientCount, response) {
  if (messages.length > clientCount) {
      response.end(JSON.stringify({
          count: messages.length,
          messages: messages.slice(clientCount).join("\n") + "\n"
      }));
  } else {
      clientResponses.push(response);
  }
}

/**
 * Recieve a message by a client.
 *
 * Inform all other "waiting" clients.
 *
 * @param message
 * @param response
 */
exports.recieveMessage = function(message, response) {
    messages.push(message);

    for (var position = clientResponses.length; position > 0; position--) {
        var clientResponse = clientResponses[position - 1];

        clientResponse.end(JSON.stringify( {
            count: messages.length,
            messages: message + "\n"
        }));
    }

    clientResponses = [];

    response.end();
}