//-------------------------------ducks/index.js---------------------------------
// GLOBAL IMPORTS
import {constants, actions, loading, success, error} from 'ducks-helpers'
import {createAction, handleActions} from 'redux-actions';

// CUSTOM IMPORTS
// ...

// ACTION TYPES
export const TYPE = constants('notes-module/note', [
    '~GET_NOTE',
    '~UPDATE_NOTE',
    'UPDATE_NOTE_DESCRIPTION',
    'UPDATE_NOTE_TITLE',
    'UPDATE_NOTE_TAGS',
])

// ACTIONS
export const ACTION = actions(TYPE);

// STATE
const INITIAL_STATE = {
    payload      : {}
    , error      : null
    , loading    : true
    , errorUpdate: null
}

// REDUCER
export default handleActions({
    [TYPE.GET_NOTE]               : getNote,
    [TYPE.GET_NOTE_SUCCESS]       : getNoteSuccess,
    [TYPE.GET_NOTE_ERROR]         : error,
    [TYPE.UPDATE_NOTE]            : updateNote,
    [TYPE.UPDATE_NOTE_SUCCESS]    : updateNoteSuccess,
    [TYPE.UPDATE_NOTE_ERROR]      : updateNoteError,
    [TYPE.UPDATE_NOTE_DESCRIPTION]: updateNoteDescription,
    [TYPE.UPDATE_NOTE_TITLE]      : updateNoteTitle,
    [TYPE.UPDATE_NOTE_TAGS]       : updateNoteTags,
}, INITIAL_STATE)

function getNote(state, action) {
    return {...state, loading: true, error: null, errorUpdate: null}
}

function getNoteSuccess(state, action) {
    return {...state, payload: action.payload, loading: false, error: null, errorUpdate: null}
}

function updateNote(state, action) {
    return {
        ...state, payload: {
            ...state.payload, description: action.payload.description,
            tags                         : [...action.payload.tags]
        }, errorUpdate   : null
    }
}

function updateNoteSuccess(state, action) {
    return {...state, errorUpdate: null, payload: {...state.payload, tags: action.payload.tags}}
}

function updateNoteError(state, action) {
    return {...state, errorUpdate: action.payload}
}

function updateNoteDescription(state, action) {
    return {...state, payload: {...state.payload, description: action.payload}}
}

function updateNoteTitle(state, action) {
    return {...state, payload: {...state.payload, title: action.payload}}
}

function updateNoteTags(state, action){
    return {...state, payload: {...state.payload, tags: action.payload.tags}}
}