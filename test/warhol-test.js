'use strict';

var tempData = require('./test-template'),
    expect = require('chai').expect,
    fs = require('fs'),
    _ = require('lodash'),
    template = tempData.template,
    lineLength = tempData.maxLineLength,
    testWarhol = undefined,
    testFile = __dirname + '/temp-test.txt';

(function redirectStdout (path) {
    process.stdout.pipe(fs.createWriteStream(path, { flags: 'a' }));
})(testFile);

describe('warhol', function () {

    var testObject = {
        title: 'Warhol Test',
        mods: [
            {
                name: 'Module 1',
                percentLoaded: '0'
            },
            {
                name: 'Module 2',
                percentLoaded: '0'
            },
            {
                name: 'Module 3',
                percentLoaded: '0'
            }
        ]
    };
    before(function () {
        var warhol = require('../');

        testWarhol = warhol({
            lines: template,
            model: testObject
        });
    });

    after(function (done) {
        // fs.unlinkSync(testFile);
    });

    function testOutput (i) {
        var lines = [
                '* Warhol Test',
                '* Module 1 ' + i + '%',
                '* Module 2 ' + i + '%',
                '* Module 3 ' + i*2 + '%'
            ],
            expected = lines.join('\n'),
            actual = fs.readFileSync(testFile).toString('utf8');

        expect(expected).to.equal(actual);
    }

    it('should update the output to stdout when the model changes', function(done) {

        this.timeout(5000);

        require('lodash').forEach([1,2,3],function (i) {
            setTimeout(function () {
                testObject.mods[0].percentLoaded = i;
                testObject.mods[1].percentLoaded = i;
                testObject.mods[2].percentLoaded = i * 2;

                testOutput(i);

                if (i === 3) {
                    done();
                }
            }, i*1000);
        });

    });

    it('should kill the watcher when kill is called on the object', function (done) {
        testWarhol.kill();
        testObject.mods[0] = testObject.mods[1] = testObject.mods[2] = 100;
        testOutput(3);
    });

});
