// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;
var NODE_ENV = process.env.NODE_ENV || 'development';
var API_URL = 'http://koa-1.mana.pro/dataart-notes'; //without ending slash!
// var API_URL = 'http://localhost:3001/dataart-notes'; //without ending slash!
var TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbWFuIFl1ZGluIiwiaWF0IjoxNDg1MTA1NDI0LCJleHAiOjE1NDgyMjA2MjR9.GCs9TD-WN0lQfdotNOaBQn7qmqSGzUI3Uk3Z__I4aP8'

function getClientEnvironment(publicUrl) {
    var processEnv = Object
        .keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce((env, key) => {
            env[key] = JSON.stringify(process.env[key]);
            return env;
        }, {
            // Useful for determining whether we’re running in production mode.
            // Most importantly, it switches React into the correct mode.
            'NODE_ENV': JSON.stringify(NODE_ENV),
            'API_URL': JSON.stringify(NODE_ENV === 'development' ? API_URL : API_URL),
            // process: {
            // 	env: {
            // 		// NODE_ENV: NODE_ENV == 'development' ? '\"development\"' : '\"production\"'
            // 		// __DEVELOPMENT__: NODE_ENV == 'development' ? `'development'` : `'production'`
            // 	}
            // }
            // 'ENV': {
            //     DEV: NODE_ENV == 'development'
            // },
            // Useful for resolving the correct path to static assets in `public`.
            // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
            // This should only be used as an escape hatch. Normally you would put
            // images into the `src` and `import` them in code to get their paths.
            'PUBLIC_URL': JSON.stringify(publicUrl),
            'TOKEN': JSON.stringify(TOKEN)
        });
    return {'process.env': processEnv};
}

module.exports = getClientEnvironment;
