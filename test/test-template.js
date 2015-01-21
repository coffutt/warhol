'use strict';

var template = [];

template.push('* {/title}');
template.push('* {/mods/0/name} {/mods/0/percentLoaded}%');
template.push('* {/mods/1/name} {/mods/1/percentLoaded}%');
template.push('* {/mods/2/name} {/mods/2/percentLoaded}%');

module.exports = {
    template: template,
    maxLineLength: 60
};
