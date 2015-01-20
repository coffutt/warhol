'use strict';

var tempData = require('./test-template'),
    expect = require('chai').expect,
    template = tempData.template,
    mockConsole = require('mock-console'),
    testWarhol = undefined;

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
        },
        consoleHolder;

    before(function () {
        consoleHolder = mockConsole(/^\*/, { width: 200, height: 200 });

        var warhol = require('../');

        testWarhol = warhol({
            lines: template,
            model: testObject
        });
    });

    after(function () {
        consoleHolder.resetStdout();
    });

    function testOutput (i) {
        var lines = [
                '* Warhol Test',
                '* Module 1 ' + i + '%',
                '* Module 2 ' + i + '%',
                '* Module 3 ' + i*2 + '%'
            ],
            expected = lines.join('\n') + '\n',
            actual = consoleHolder.getConsoleOutput();

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
        done();
    });

});
