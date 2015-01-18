'use strict';

var template = require('./template'),
    bigBro = require('big-bro');

module.exports = function (config) {
    var lines = config.lines,
        model = config.model;

    var temp = template(lines);

    var watcher = bigBro({
        obj: model,
        callbacks: function (updated) {
            template.update(updated);
        }
    });

    return {
        kill: function () {
            // TODO this feels like a memory leak...
            watcher.clearListeners();
        }
    }
}
