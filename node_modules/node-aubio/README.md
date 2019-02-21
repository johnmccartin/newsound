# node-aubio

Node.js bindings for [aubio][aubio], a library for audio and music analysis,
synthesis, and effects. aubio features include pitch tracking, onset detectin,
beat tracking (tempo), phase vocoder, biquad and IIR filters.

In order to use this module, you will need to have [aubio][aubio] installed on
your system. See [aubio's download page][aubio-download] to find out how to get
aubio for your system.

node-aubio uses [ffi][ffi] to load aubio's dynamic library and use directly the
aubio functions as well as [ref][ref] to access C pointers efficiently. To find
out more about [ffi][ffi] and [ref][ref], read the [Node FFI
Tutorial](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial).

[aubio]: https://aubio.org
[aubio-download]: https://aubio.org/download
[ffi]: https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
[ref]: https://github.com/TooTallNate/ref
