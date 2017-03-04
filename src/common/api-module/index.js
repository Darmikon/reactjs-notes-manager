// import pathToRegexp from 'path-to-regexp' // https://github.com/pillarjs/path-to-regexp
import qs from 'qs' // https://github.com/ljharb/qs
//or https://github.com/sindresorhus/query-string
import axios from 'axios';

const ROOT_URL = process.env.API_URL
const TOKEN = process.env.TOKEN
var auth
if(TOKEN){
	auth = {
		headers: {
			Authorization: `Bearer ${TOKEN}`
		}
	}
}
const INITIAL_OPTIONS = auth || {}

const REGEX = {
	colonParams: /:([a-z]\w*)/gi
	,repeatingSlashes: /[\/]{2,}/g
	,trailingSlashes: /\/+$/i
}

const api = {
    get(url,colonParams,queryParams,options){
        let config = {
            method: 'get'
			, url: absoluteUrl(url,colonParams,queryParams)
        };

		return callAPIMethod(config,options);
    }
	, post(url,colonParams,data,options,queryParams){
		let config = {
			method: 'POST'
			, url: absoluteUrl(url,colonParams,queryParams)
			, data
		};

		return callAPIMethod(config,options);
    }

	, put(url,colonParams,data,options,queryParams){
		let config = {
			method: 'PUT'
			, url: absoluteUrl(url,colonParams,queryParams)
			, data
		};

		return callAPIMethod(config,options);
    }

	, delete(url,colonParams,data,options,queryParams){
		let config = {
			method: 'DELETE'
			, url: absoluteUrl(url,colonParams,queryParams)
		};

		return callAPIMethod(config,options);
	}
}

function interpolateUrl(url,colonParams){
	colonParams = colonParams || {};
	url = url.trim();

	// Replace each colon param in the URL (ex, :userId).
	url = url.replace(
		REGEX.colonParams
		,function(fullMatch,key){
			var param = colonParams[key];

			if(param === undefined){
				param = '';
			}

			return param;
		}
	);
	url = url.replace(REGEX.repeatingSlashes,'/');
	url = url.replace(REGEX.trailingSlashes,'');

	return url;
}

function absoluteUrl(url,colonParams,queryParams = {}){
	var absUrl = ROOT_URL + '/' + interpolateUrl(url,colonParams);

	if(Object.keys(queryParams).length > 0){
		absUrl += (~absUrl.indexOf('?') ? '' : '?') + qs.stringify(queryParams)

		// in case of bug use next:
		// absUrl += (~absUrl.indexOf('?') ? '' : '?')
         //    + Object.keys(queryParams).map(name => `${name}=${queryParams[name]}`).join('&');
	}

	return absUrl;
}

function request(config, options = {}){
	return axios(Object.assign(config,options));
}

function handleResponse(promise){
	return promise.then(handleSuccess,handleError);
}

function handleSuccess(response){
    const {data} = response
        , payload = Object(data) === data && data || {};

	// if(!payload.status){
	// 	payload.status = apiStatuses.Success;
	// }

	//todo remove this when back-end will be consistent
	if(response.status !== 204 && !payload.data){
		console.error(
			'API is not compliant. Server responded with no data property.'
			+ 'Please update your team on this.'
		);
	}

	// properties order is important
	// return {
	// 	data: payload.data.data
	// 	, headers: payload.headers
	// 	, status: payload.status
	// 	, config: payload.config
	// 	, statusText: payload.statusText
	// 	, request: payload.request
	// };

	return [
		payload.data
		, response.status
		, response.statusText
		, response.headers
		, response.config
		, response.request
	];
}

function handleError(error){
    const response = error.response;

	// properties order is important
	// return Promise.reject(new Error(JSON.stringify(response.data)));
	return Promise.reject(response && response.data || {
        statusCode: 521,
        error: error.message,
        message: 'Web Server Is Down'
	});
}

function callAPIMethod(config,options = INITIAL_OPTIONS){
	// config.responseType = options.responseType;
	// config.notifyGlobalLoader = !options.silent;
	//
	// if(config.data && config.data instanceof FormData){
	// 	config.headers = {'Content-Type': undefined};
	// 	config.transformRequest = angular.identity;
	// }

	return handleResponse(request(config,options));
}

export default api;