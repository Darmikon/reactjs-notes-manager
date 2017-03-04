import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from '../ducks';
import {loadState,saveState} from '/common/local-storage-module'
// sagas
import throttle from 'lodash/throttle'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import sagas from '../sagas'

//----------------redux router
import {browserHistory,hashHistory} from 'react-router'; //eslint-disable-line no-unused-vars
import {routerMiddleware} from 'react-router-redux';

const enhancer = compose(
    applyMiddleware(
        //--------------------redux router
        routerMiddleware(browserHistory)
        // routerMiddleware(hashHistory)
        ,sagaMiddleware
    )
);

export default function configureStore(initialState){
    const store = createStore(
        rootReducer
        //such method can be used only here not in enhancer
        //see how implement it as middleware
        //https://github.com/elgerlambert/redux-localstorage/blob/master/src/persistState.js
        // ,loadState() || initialState //load from localStorage
        ,initialState
        ,enhancer
    );

    //substribe localStorage save method to state change event
    // store.subscribe(throttle(() =>{
    //     //i can save only particular modules such as saveState({notes: store.getState().notes})
    //     saveState(store.getState())
    // },1000))

    //run saga
    sagaMiddleware.run(sagas)

    return store;
}
