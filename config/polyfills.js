// require('babel-runtime/core-js/promise').default = require('bluebird');
// require('babel-polyfill');

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
