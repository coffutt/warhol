'use strict';

var _ = require('lodash'),
    jsonPath = require('json-path');

// TODO can probably build these paths once instead of every update
function resolvePath (model, path) {
    var p = jsonPath.create(path),
        resolved= p.resolve(model);

    return resolved.length > 0 ? resolved[0] : undefined;
}

function parseLine (line) {
    var split = line.split(/\{([^\{\}]*)\}/g),
        chunks = {},
        chunkSize = split.length;

    for (var i = 0; i < chunkSize; i++) {
        chunks[i] = i % 2 ? { path: split[i] } : split[i];
    }

    return function (model) {
        return _.reduce(chunks, function (mem, chunk) {
            return mem + (typeof chunk === 'string' ? chunk : resolvePath(model, chunk.path));
        }, '');
    };
}

function Template (templateLines, maxLineSize) {
    var updaters = _.map(templateLines, parseLine),
        numLines = templateLines.length,
        firstWrite = true;

    function writeLines (model) {
        _.each(updaters, function (fn) {
            process.stdout.write(fn(model) + '\n');
        });
    }

    return {

        update: function (model) {
            if (firstWrite) {
                firstWrite = false;
            } else {
                process.stdout.moveCursor(0, -numLines);
                process.stdout.clearScreenDown();
            }

            writeLines(model);
        }

    }
}

module.exports = Template;
