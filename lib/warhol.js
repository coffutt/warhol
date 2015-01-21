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
            temp.update(updated);
        }
    });

    return {
        kill: function () {
            watcher.clearListeners();
        }
    };
};
