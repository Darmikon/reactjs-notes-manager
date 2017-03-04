//-------------------------------ducks/index.js---------------------------------
// GLOBAL IMPORTS
import {constants, actions, loading, success, error} from 'ducks-helpers'
import {createAction, handleActions} from 'redux-actions';
import { normalize, schema } from 'normalizr';
import Immutable from 'immutable';
// import _ from 'lodash'

// CUSTOM IMPORTS
// ...

// ACTION TYPES
export const TYPE = constants('notes-module/folders', [
    '~GET_FOLDERS',
    'ADD_NEW',
    '~CREATE_FOLDER',
    '~DELETE_FOLDER',
    'EDIT_FOLDER',
    '~UPDATE_FOLDER',
    'UPDATE_FOLDER_FIELD',
    'UPDATE_CREATE_FIELD',
    'UNDO_EDIT',
    'UNDO_CREATE',
    'SHOW_FOLDER',
    'TOGGLE_FOLDER',
])

// ACTIONS
export const ACTION = actions(TYPE);

// STATE
const INITIAL_STATE = {
    // payload             {}
    folders             : {}
    , result            : []
    , error             : null
    , loading           : false
    , loadingCreate     : false
    , errorCreate       : null
    , isAddNew          : false
    , loadingFolder     : false
    , editingFolder     : false
    , loadingFolderId   : null
    , loadingFolderError: null
    , editFolderTitle   : ''
    , createFolderTitle : ''
    , currentFolder     : null
}

const folderSchema = new schema.Entity('folders',{},{idAttribute: '_id'});
const foldersSchema = new schema.Array(folderSchema);
folderSchema.define({ childNodes: foldersSchema });

// REDUCER
export default handleActions({
    [TYPE.GET_FOLDERS]          : loading,
    [TYPE.GET_FOLDERS_SUCCESS]  : getFolderSuccess,
    [TYPE.GET_FOLDERS_ERROR]    : error,
    [TYPE.ADD_NEW]              : addNew,
    [TYPE.CREATE_FOLDER]        : createFolder,
    [TYPE.CREATE_FOLDER_SUCCESS]: createFolderSuccess,
    [TYPE.CREATE_FOLDER_ERROR]  : createFolderError,
    [TYPE.DELETE_FOLDER]        : deleteFolder,
    [TYPE.DELETE_FOLDER_SUCCESS]: deleteFolderSuccess,
    [TYPE.DELETE_FOLDER_ERROR]  : deleteFolderError,
    [TYPE.EDIT_FOLDER]          : editFolder,
    [TYPE.UPDATE_FOLDER_FIELD]  : updateFolderField,
    [TYPE.UPDATE_FOLDER]        : updateFolder,
    [TYPE.UPDATE_FOLDER_SUCCESS]: updateFolderSuccess,
    [TYPE.UPDATE_FOLDER_ERROR]  : updateFolderError,
    [TYPE.UPDATE_CREATE_FIELD]  : updateCreateField,
    [TYPE.UNDO_EDIT]            : undoEdit,
    [TYPE.UNDO_CREATE]          : undoCreate,
    [TYPE.SHOW_FOLDER]          : showFolder,
    [TYPE.TOGGLE_FOLDER]        : toggleFolder,
}, INITIAL_STATE)

function getFolderSuccess(state, action){
    const response = normalize(action.payload, foldersSchema);
    const {result, entities: {folders}} = response;

    return {...state, error: null, loading: false, result, folders};
}

function createFolder(state, action) {
    return {...state, loadingCreate: true, errorCreate: null}
}

function createFolderSuccess(state, action) {
    const {payload} = action
    const {parentId} = payload;
    let folders
        ,results;

    if(!parentId){
        folders = {[payload._id]: payload, ...state.folders}
        results = [payload._id,...state.result]
    }else{
        const updatedParent = {
            ...state.folders[parentId]
            ,childNodes: [...state.folders[parentId].childNodes || [], payload._id]
        }

        folders = {
            [payload._id]: payload,
            ...state.folders,
            [parentId]: updatedParent
        }

        results = [...state.result]
    }

    const updatedState = {
        ...state, loadingCreate: false, errorCreate: null,
        createFolderTitle: '', isAddNew: false,
        result: [...results],
        folders: {...folders},
    }

    return showFolder(updatedState, {payload: payload._id})
}

function createFolderError(state, action) {
    return {...state, errorCreate: action.payload, loadingCreate: false}
}

function addNew(state, action) {
    return {...state, isAddNew: !state.isAddNew}
}

function deleteFolder(state, action) {
    return {...state, loadingFolder: true, loadingFolderId: action.payload, loadingFolderError: null}
}
function deleteFolderSuccess(state, action) {
    const removedId = action.payload;
    const indexOfId = state.result.indexOf(removedId);
    const {parentId} = state.folders[removedId];
    let foldersFiltered;
    let folders;

    if(parentId){
        foldersFiltered = Object.keys(state.folders)
            .filter(key => key !== removedId)
            .reduce((result, current) => {
                result[current] = state.folders[current];
                return result;
            }, {});

        folders = {...foldersFiltered, [parentId]: {
            ...foldersFiltered[parentId],
            childNodes: foldersFiltered[parentId].childNodes.filter(id=>id!==removedId)
        }}
    }else{
        folders = {...state.folders};
    }

    return {
        ...state, loadingFolder: false,
        result: state.result.filter(id=>id !== removedId),
        folders: {...folders},
        // payload                : state.payload.filter(o => o._id !== action.payload),
        loadingFolderId        : null, loadingFolderError: null
    }
}
function deleteFolderError(state, action) {
    return {...state, loadingFolder: false, loadingFolderError: action.payload}
}

function editFolder(state, action){
    return {...state, editingFolder: true, loadingFolderId: action.payload._id,
        // editFolderTitle: state.payload.filter(o=>o._id === action.payload)[0].title
        editFolderTitle: action.payload.title
    }
}

function updateFolder(state, action){
    return {...state, loadingFolder: true, loadingFolderId: action.payload.folderId}
}

function updateFolderSuccess(state, action){
    const {title, folderId} = action.payload

    return {...state, loadingFolder: false,
        editingFolder: false,
        // payload: state.payload.map(o=>(
        //     o._id === action.payload.folderId
        //         ? {...o, title: action.payload.title}
        //         : o)),
        loadingFolderId: null,
        folders: {...state.folders, [folderId]: {...state.folders[folderId], title}}
    }
}

function updateFolderError(state, action){
    return {...state, loadingFolder: false, loadingFolderError: action.payload, editingFolder: false}
}

function updateFolderField(state, action){
    return {
        ...state,
        editFolderTitle: action.payload
    }
}

function updateCreateField(state, action){
    return {
        ...state,
        createFolderTitle: action.payload
    }
}

function undoEdit(state, action){
    return {...state, editingFolder: false}
}

function undoCreate(state, action){
    return {...state, isAddNew: false}
}

function toggleTree(state,action){
    let id = action.payload,
        isOpened = action.meta
    let newState = {...state, folders: {...state.folders, [id]: {...state.folders[id], opened: isOpened}}};

    let {parentId} = state.folders[action.payload]
    if(parentId){
        return toggleTree(newState, {payload: parentId, meta: isOpened})
    }else{
        return newState;
    }
}

function toggleLeaves(state,action){
    let id = action.payload,
        isOpened = action.meta
    let newState = {...state, folders: {...state.folders, [id]: {...state.folders[id], opened: isOpened}}};

    let {childNodes} = state.folders[action.payload]

    if(childNodes){
        return childNodes.reduce((stateFrom,id)=>{
            return toggleLeaves(stateFrom, {payload: id, meta: isOpened})
        },newState)
    }else{
        return newState
    }
}

function showFolder(state, action){
    const _id = action.payload;

    if(!_id || _id === state.currentFolder){
        return {...state}
    }else{
        const updatedState = {...state, currentFolder: _id}
        const {parentId} = state.folders[_id];

        if(parentId){
            return toggleTree(updatedState, {payload: parentId, meta: true});
        }else{
            return updatedState;
        }
    }
}

function toggleFolder(state, action){
    const _id = action.payload;
    const hasChilds = state.folders[_id].childNodes && state.folders[_id].childNodes.length;

    if(!hasChilds){
        return state;
    }

    if(state.folders[_id].opened){
        return toggleLeaves(state, {payload: _id, meta: false});
    }else{
        return {...state, folders: {...state.folders, [_id]:{ ... state.folders[_id], opened: true}}}
    }
}