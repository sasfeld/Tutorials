/**
 * Long-Polling chat demo with Node.js
 *
 * Frontend Javascript.
 *
 * @author Sascha Feldmann
*/


$(document).ready(function() {
    var counter = 0;

    /**
     * Longpolling method. We are constantly expecting responses from the backend.
     */
    var poll = function() {
        $.getJSON('/poll/' + counter, function (response) {
            counter = response.count;

            console.log('polling...');
            var textElement = $('#chatOutput');
            textElement.append(response.messages);
            poll();
        });
    }

    poll();

    /**
     * Send message request to Node.js backend.
     */
    $('#chatInput').change(function() {
        $.ajax({
            url: '/msg/' + encodeURIComponent($('#chatInput').val())
        });
    });
});