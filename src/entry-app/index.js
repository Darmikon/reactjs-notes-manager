import '/common/polyfills'
if(process.env.NODE_ENV === 'development'){
    //image placeholders mock
    require('holderjs')
}

// // http://bluebirdjs.com/docs/api/promise.config.html
// Promise.config({
//     warnings: false
//     ,longStackTraces: false
//     , cancellation: false //http://bluebirdjs.com/docs/api/cancellation.html
//     , monitoring: false
// })

// import './index.scss'
// import 'font-awesome/css/font-awesome.css'
import render from './_index-module';
// import render from './_test-example-module'
render();
