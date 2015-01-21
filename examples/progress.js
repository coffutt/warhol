'use strict';

/**
 * Creates a block of text indicating the progress of some process.
 */

// Build out your template lines with xpaths to the variables in your model
var template = [];
template.push(new Array(100).join('*'));
template.push('* {/title}');
template.push('* {/mods/0/name} {/mods/0/percentLoaded}%');
template.push('* {/mods/1/name} {/mods/1/percentLoaded}%');
template.push('* {/mods/2/name} {/mods/2/percentLoaded}%');
template.push(new Array(100).join('*'));

// Build your corresponding model object
var model = {
    title: 'System Progress',
    mods: [
        {
            name: 'Process 1',
            percentLoaded: '0'
        },
        {
            name: 'Process 1',
            percentLoaded: '0'
        },
        {
            name: 'Process 1',
            percentLoaded: '0'
        }
    ]
};

// Set up your warhol instance
var warhol = require('../')({
    lines: template,
    model: model
});

// Every second update your percentages and kill at 100% This is a really simmple
// implementation but it demonstrates the point.
[1,2,3,4,5,6,7,8,9,10].forEach(function (i) {
    setTimeout(function () {
        for (var j = 0; j < model.mods.length; j++) {
            model.mods[j].percentLoaded = i * 10;
        }
    }, i*1000);
})
