'use strict';

var template = [],
    lineLength = 60;

template.push(new Array(lineLength).join('*'));
template.push('* {/title}');
// template.push({
//     text: ['* {mods[0].name}', '{mods[0].precentLoaded} *'],
//     spacing: 'spread'
// });
// template.push({
//     text: ['* {mods[1].name}', '{mods[1].percentLoaded} *'],
//     spacing: 'spread'
// });
// template.push({
//     text: ['* {mods[2].name}', '{mods[2].percentLoaded} *'],
//     spacing: 'spread'
// });
template.push('* {/mods/0/name} {/mods/0/percentLoaded}%');
template.push('* {/mods/1/name} {/mods/1/percentLoaded}%');
template.push('* {/mods/2/name} {/mods/2/percentLoaded}%');

template.push(new Array(lineLength).join('*'));

module.exports = {
    template: template,
    maxLineLength: 60
};
