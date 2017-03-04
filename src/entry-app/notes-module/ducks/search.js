//-------------------------------ducks/index.js---------------------------------
// GLOBAL IMPORTS
import {constants, actions, loading, success, error} from 'ducks-helpers'
import {createAction, handleActions} from 'redux-actions';

// CUSTOM IMPORTS
// ...

// ACTION TYPES
export const TYPE = constants('notes-module/search', [
    'GET_SEARCH'
])

// ACTIONS
export const ACTION = actions(TYPE);

// STATE
const INITIAL_STATE = {
    payload      : []
    // , error      : null
    // , loading    : false
}

// REDUCER
export default handleActions({
    [TYPE.GET_SEARCH]: getSearch,
}, INITIAL_STATE)

function getSearch(state, action) {
     // debugger
    return {...state, payload: action.payload}
}