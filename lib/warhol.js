'use strict';

var template = require('./template'),
    spectator = require('./spectator');

module.exports = function (config) {
    var lines = config.lines,
        maxLineSize = config.maxLineSize || 60,
        timeout = config.timeout || 100,
        model = config.model;

    var temp = template(lines, maxLineSize);
    var spec = spectator(model, temp, timeout);

    spec.watch();

    return {
        kill: function () {
            spec.kill();
        }
    }
}
