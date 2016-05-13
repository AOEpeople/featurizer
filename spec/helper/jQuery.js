/*

USAGE:

var $;
beforeEach(function(done) {
    require('./helper/jQuery')(function(jQuery) {
        $ = jQuery;
        done();
    });
});

 */
module.exports = function(callback) {
    var env = require('jsdom').env;
    env('', function(errors, window) {
        $ = require('jquery')(window);
        callback($);
    });
};