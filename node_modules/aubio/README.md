node-aubio
==========
### Bindings for aubio

Node.js bindings for [aubio][aubio], a library for audio and music analysis,
synthesis, and effects. aubio features include pitch tracking, onset detectin,
beat tracking (tempo), phase vocoder, biquad and IIR filters.

Installation
------------

In order to use this module, you will first need to have [aubio][aubio]
installed on your system. See [aubio's download page][aubio-download] to find
out how to get aubio for your system.

Install with `npm`:

``` bash
$ npm install aubio
```

Or add it to the `"dependencies"` section of your _package.json_ file.

node-aubio uses [ffi][ffi] to load aubio's dynamic library and use directly the
aubio functions as well as [ref][ref] to access C pointers efficiently. To find
out more about [ffi][ffi] and [ref][ref], read the [Node FFI
Tutorial][node-ffi-tutorial].

Examples
--------

Start using `node-aubio` simply adding a require statement:

``` js
var aubio = require('aubio');
```

The folder `examples` contains different examples.

`source_reader.js` will open and read a sound file, counting the number of
frames.

``` bash
$ node node-aubio/examples/source_reader.js mediafile.wav
```

`mfcc.js` will open a sound file and extract the MFCC coefficients from a file.

``` bash
$ node node-aubio/examples/mfcc.js mediafile.wav
```

`filter_source.js` will process a sound and filter it using an A-weighting
filter. The program takes two arguments: an input media file, and an output
file to write to:

``` bash
$ node node-aubio/examples/filter_source.js input.wav output.wav
```

License
-------

node-aubio is free software: you can redistribute it and/or modify it under the
terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.


[aubio]: https://aubio.org
[aubio-download]: https://aubio.org/download
[ffi]: https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
[ref]: https://github.com/TooTallNate/ref
[node-ffi-tutorial]: https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
