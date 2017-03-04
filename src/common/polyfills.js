// require('babel-runtime/core-js/promise').default = require('bluebird');
import 'babel-polyfill';
// https://github.com/este/este/blob/74509386fa8af6fade64045c857dadcbb88d8e72/src/server/index.js#L20
import Bluebird from 'bluebird';

Bluebird.config({
    warnings: false,
    longStackTraces: false,
    cancellation: false,
    monitoring: false
});

// window.OldPromise = window.Promise;
if(global) global.Promise = Bluebird;
if(window) window.Promise = Bluebird;