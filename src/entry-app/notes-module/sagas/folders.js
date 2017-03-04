// GLOBAL IMPORTS
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

// CUSTOM IMPORTS
import api from '/common/api-module'
import {TYPE, ACTION} from '../ducks/folders'

// API
export const Api = {
	getData: () =>
		api.get('folders')
			.spread(data => data),

	createFolder: (payload)=>
		api.post('folders',null,payload)
			.spread(data=>data),

    deleteFolder: folderId=>
        api.delete('folders/:folderId',{folderId})
            .spread(data=>data),

    updateFolder: (payload)=>{
		const {folderId, title} = payload
        return api.put('folders/:folderId',{folderId},{title})
            .spread(data=>data)
    },
}

// GENERATORS
export function* getData(action) {
	try {
		const response = yield call(Api.getData, action.payload);
		yield put(ACTION.getFoldersSuccess(response));

		//select first folder if exists
		const folderId = response[0] && response[0]._id;
		if(folderId && !/notes.{2,}$/.test(window.location.pathname)){
			yield put(push(`/notes/${folderId}`))
		}
	} catch (e) {
		yield put(ACTION.getFoldersError(e));
	}
}

export function* createFolder(action) {
	try {
		const response = yield call(Api.createFolder, action.payload);
		yield put(ACTION.createFolderSuccess(response));
        yield put(push(`/notes/${response._id}`))
	} catch (e) {
		yield put(ACTION.createFolderError(e));
	}
}

export function* deleteFolder(action) {
    try {
        const response = yield call(Api.deleteFolder, action.payload);
        yield put(ACTION.deleteFolderSuccess(action.payload));
        yield put(push(`/notes`))
    } catch (e) {
        yield put(ACTION.deleteFolderError(e));
    }
}

export function* updateFolder(action) {
    try {
        const response = yield call(Api.updateFolder, action.payload);
        yield put(ACTION.updateFolderSuccess(action.payload));
    } catch (e) {
        yield put(ACTION.updateFolderError(e));
    }
}

// SAGAS
export default {
    * foldersGetSaga() {
        yield takeLatest(TYPE.GET_FOLDERS, getData);
    },
    * folderCreateSaga() {
        yield takeLatest(TYPE.CREATE_FOLDER, createFolder);
    },
    * folderDeleteSaga() {
        yield takeLatest(TYPE.DELETE_FOLDER, deleteFolder);
    },
    * folderUpdateSaga() {
        yield takeLatest(TYPE.UPDATE_FOLDER, updateFolder);
    },
    // †SAGA ...
}