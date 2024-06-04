/**
 * @fileoverview
 * This package safely returns the value at a requested path inside of
 * an object. Best used on unpredictable deeply nested structures. Supports
 * arrays as well. See README.md for more info.
 *
 */

/**
 * @param {Array.<string|number>|String} path – e.g ['key1', 0, 'key2'] or a string such as 'key1.0.key2
 * @param {Object|Array} object
 * @returns {*}
 */
var getNestedValue = function (path, object) {
  if (!Array.isArray(path) && typeof path !== 'string') {
    throw Error('The package get-nested-value received a non-contract path. Please provide a string, number, or an array of those!');
  }
  var searchPath = path;
  if (!Array.isArray(path)) {
    searchPath = searchPath.split('.');
  }
  return searchPath
    .reduce(function (prev, cur) {
      if (prev && prev[cur] !== undefined) {
        return prev[cur];
      }
      return undefined;
    }, object);
};

module.exports = getNestedValue;
