//-------------------------------ducks/index.js---------------------------------
// GLOBAL IMPORTS
import {constants, actions, loading, success, error} from 'ducks-helpers'
import {createAction, handleActions} from 'redux-actions';

// CUSTOM IMPORTS
// ...

// ACTION TYPES
export const TYPE = constants('notes-module/tags', [
    '~GET_TAGS'
])

// ACTIONS
export const ACTION = actions(TYPE);

// STATE
const INITIAL_STATE = {
    payload  : []
    , error  : null
    , loading: false
}

// REDUCER
export default handleActions({
    [TYPE.GET_TAGS]        : loading,
    [TYPE.GET_TAGS_SUCCESS]: success,
    [TYPE.GET_TAGS_ERROR]  : success,
}, INITIAL_STATE)