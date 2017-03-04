//-------------------------------ducks/index.js---------------------------------
// GLOBAL IMPORTS
import {constants, actions, loading, success, error} from 'ducks-helpers';
import {handleActions} from 'redux-actions';
// CUSTOM IMPORTS
import {TYPE as NOTE_TYPE} from '../ducks/note';

// ACTION TYPES
export const TYPE = constants('notes-module/notes', [
    '~GET_NOTES',
    '~CREATE_NOTE',
    '~DELETE_NOTE',
    'MOVE_NOTE',
    '~ON_DROP',
    '~GET_NOTES_QUERY'
])

// ACTIONS
export const ACTION = actions(TYPE);

// STATE
const INITIAL_STATE = {
    payload            : []
    , error            : null
    , loading          : true
    , createError      : null
    , createLoading    : false
    , deleteNoteLoading: false
    , deleteNoteError  : null
}

// REDUCER
export default handleActions({
    [TYPE.GET_NOTES]              : loading,
    [TYPE.GET_NOTES_SUCCESS]      : success,
    [TYPE.GET_NOTES_ERROR]        : error,
    [TYPE.CREATE_NOTE]            : createNote,
    [TYPE.CREATE_NOTE_SUCCESS]    : createNoteSuccess,
    [TYPE.CREATE_NOTE_ERROR]      : createNoteError,
    [TYPE.DELETE_NOTE]            : deleteNote,
    [TYPE.DELETE_NOTE_SUCCESS]    : deleteNoteSuccess,
    [TYPE.DELETE_NOTE_ERROR]      : deleteNoteError,
    [NOTE_TYPE.UPDATE_NOTE]       : updateNote,
    [TYPE.MOVE_NOTE]              : moveNote,
    [TYPE.ON_DROP]                : onDrop,
    [TYPE.ON_DROP_SUCCESS]        : onDropSuccess,
    [TYPE.ON_DROP_ERROR]          : onDropError,
    [TYPE.GET_NOTES_QUERY]        : loading,
    [TYPE.GET_NOTES_QUERY_SUCCESS]: success,
    [TYPE.GET_NOTES_QUERY_ERROR]  : error,
}, INITIAL_STATE)

function createNote(state, action) {
    return {...state, createLoading: true, createError: null}
}

function createNoteSuccess(state, action) {
    return {
        ...state, createLoading: false, createError: null, deleteNoteError: null,
        payload                : [].concat(action.payload, state.payload)
    }
}

function createNoteError(state, action) {
    return {...state, createError: action.payload, createLoading: false}
}

function deleteNote(state, action) {
    return {
        ...state, deleteNoteLoading: true, deleteNoteError: null,
        deleteNoteId               : action.payload,
        createNoteLoading          : false, createNoteError: null
    }
}

function deleteNoteSuccess(state, action) {
    return {
        ...state, deleteNoteLoading: false, deleteNoteError: null
        , payload                  : state.payload.filter(o => o._id !== action.payload)
    }
}

function deleteNoteError(state, action) {
    return {...state, deleteNoteLoading: false, deleteNoteError: action.payload}
}

function updateNote(state, action) {
    return {
        ...state, payload: state.payload.map(
            (o, i) => {
                return o._id === action.payload.noteId ? {...o, title: action.payload.title} : o
            })
    }
}

function moveNote(state, action) {
    const {hoverIndex, dragIndex} = action.payload;
    let cards1 = state.payload.slice();

    cards1.splice(hoverIndex, 0, cards1.splice(dragIndex, 1)[0])
    // cards1 = cards1.map((card,i)=>({...card,order:i}))

    return {
        ...state, previousPayload: [...state.payload], payload: cards1, errorMove: null
    }
}

function onDrop(state, action) {
    return {
        ...state, loadingMove: true
    }
}

function onDropSuccess(state, action) {
    return {
        ...state, previousPayload: undefined, errorMove: null, loadingMove: false
    }
}
function onDropError(state, action) {
    return {
        ...state, errorMove: action.payload, payload: [...state.previousPayload], previousPayload: undefined,
        loadingMove        : false
    }
}