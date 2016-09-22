var fs = require("fs");
var mkdirp = require("mkdirp");
var _ = require("../instrumented/vendor/underscore-min");



// Exercise the instrumented code
var arr = [1, 2, 3];

arr = _.map(arr, function(num) {
  return num + 1;
});

_.forEach(arr, function(num) {
  console.log(num);
});



// Save the coverage metrics
mkdirp.sync("./coverage");
fs.writeFileSync("./coverage/coverage.json", JSON.stringify(__coverage__));
