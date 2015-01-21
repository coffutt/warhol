#  Warhol

> Asynchronously update blocks of command line text.  A work in progress....

Build a model object and then an array of log lines, this module will update
a block of text whenever the model object is changed. Log line templates are built
using json-paths (see http://goessner.net/articles/JsonPath/ for examples)

## Install

```sh
$ npm install --save warhol
```

## Usage

```javascript

var warhol = require('warhol');

var model = { varA: 'Some var', varB: { varC: 'Another' } };
var template = ['First var: {/varA}', 'Second var: {/varA/varB}'];

warhol({
    lines: template,
    model: model
});

// Do some asynchronous updating of the model...

warhol.kill(); // Remove all listeners and give up console control

```

See the examples folder for more in depth examples. 

Note that you'll see some unwanted behavior if you or a dependency are logging
to the console during your warhol sessions. I plan to address this is future
iterations.

## License

MIT © [Craig Offutt](https://github.com/craig-o)
