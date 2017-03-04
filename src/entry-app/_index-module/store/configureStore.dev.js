import {createStore,applyMiddleware,compose} from 'redux';
import {persistState} from 'redux-devtools';
import DevTools from '../containers/DevTools';
import {loadState,saveState} from '/common/local-storage-module'
// saga
import throttle from 'lodash/throttle'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import sagas from '../sagas'

//----------------redux router
import {browserHistory,hashHistory} from 'react-router'; // eslint-disable-line no-unused-vars
import {routerMiddleware} from 'react-router-redux';

import rootReducer from '../ducks';

const enhancer = compose(
	applyMiddleware(
		//--------------------redux router
		routerMiddleware(browserHistory)
		,sagaMiddleware
	)
	,DevTools.instrument()
	,persistState(
		window.location.href.match(
			/[?&]debug_session=([^&#]+)\b/
		)
	)
	// ,window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState){
	const store = createStore(
		rootReducer
		// such method can be used only here not in enhancer
		// see how implement it as middleware
		// https://github.com/elgerlambert/redux-localstorage/blob/master/src/persistState.js
		// ,loadState() || initialState // load from localStorage
		,initialState
		,enhancer
	);

	//substribe localStorage save method to state change event
	// store.subscribe(throttle(() =>{
	// 	//i can save only particular modules such as saveState({notes: store.getState().notes})
	// 	saveState(store.getState())
	// },1000))

	//run saga
	sagaMiddleware.run(sagas)

	if(module.hot){
		module.hot.accept('../ducks',() =>
			store.replaceReducer(require('../ducks').default)
		);
	}

	return store;
}
