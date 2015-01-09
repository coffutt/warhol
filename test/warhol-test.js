'use strict';

var watchMe = {
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
var tempData = require('./test-template'),
    template = tempData.template,
    lineLength = tempData.maxLineLength;

var warhol = require('../');
warhol({
    lines: template,
    model: watchMe
});

require('lodash').forEach([1,2,3,4,5,6,7,8],function (i) {
    setTimeout(function () {
        watchMe.mods[0].percentLoaded = i;
        watchMe.mods[1].percentLoaded = i;
        watchMe.mods[2].percentLoaded = i * 2;
    }, i*1000);
});
