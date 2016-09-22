# remap-istanbul-test

A simple test of [`remap-istanbul`](https://github.com/SitePen/remap-istanbul)
using [`nyc`](https://github.com/istanbuljs/nyc) and
[`underscore`](http://underscorejs.org/).

Run `npm install` then `npm test`.

## tl;dr

See the reports:

- [nyc](https://gitgrimbo.github.io/remap-istanbul-test/nyc-report/),
  no source maps.
- [remap-istanbul](https://gitgrimbo.github.io/remap-istanbul-test/remap-istanbul-report/),
  source maps.

## Why?

We want to be able to run some test code that uses `underscore-min.js`,
and see a code coverage report that maps the coverage back to the unminified
`underscore.js`.

## How?

In more detail, running `npm test` will:

1. Instrument [vendor/underscore-min.js](vendor/underscore-min.js) using `nyc`.

   We use the minified version because we want to ultimately test
   `remap-istanbul`'s ability to map this minified code back to the original
   source with source maps.

   The project contains the source map for `underscore-min.js`
   ([vendor/underscore-min.map](vendor/underscore-min.map)), and the original
   `underscore.js` code that is referred to by the source map
   ([vendor/underscore.js](vendor/underscore.js)).

1. Exercise some simple test code, [src/test.js](src/test.js).

   This test code [`require`](https://nodejs.org/api/modules.html#modules_all_together)s
   the instrumented `underscore-min.js` and uses some of its functionality to generate
   some coverage data. This coverage data is then saved to a
   [coverage.json](https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md)
   file.

1. Generate a HTML report using `nyc`, to `./nyc-report`.

   This report does **not** use source maps. This report shows coverage
   information for the 'raw' `underscore-min.js` code.

1. Generate a HTML report using `remap-istanbul`, to `./remap-istanbul-report`.

   This report shows coverage information collected when using the
   `underscore-min.js` code, but this coverage is now mapped to the original
   `underscore.js` source code using source maps.

# License

MIT © [Paul Grime](https://github.com/gitgrimbo/)
