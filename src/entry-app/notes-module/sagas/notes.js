// GLOBAL IMPORTS
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

// CUSTOM IMPORTS
import api from '/common/api-module'
import {TYPE, ACTION} from '../ducks/notes'

// API
export const Api = {
	getItems: folderId =>
		api.get('folders/:folderId/notes',{folderId})
			.spread(data=>data),

    createNote: data =>api.post('folders/:folderId/note',
			{folderId: data.folderId}, {title: data.title})
            .spread(data=>data),

    deleteNote: noteId =>api.delete('notes/:noteId', {noteId})
        .spread(data=>data),

    onDrop: notes =>api.put('notes',null,{notes}),

    getNotesQuery: query=>api.get('notes?q=:q&type=:type',query)
        .spread(data=>data),
}

// GENERATORS
export function* getItems(action) {
	try {
		const response = yield call(Api.getItems, action.payload);
		yield put(ACTION.getNotesSuccess(response));
	} catch (e) {
		yield put(ACTION.getNotesError(e));
	}
}

export function* getNotesQuery(action) {
    try {
        const response = yield call(Api.getNotesQuery, action.payload);
        yield put(ACTION.getNotesQuerySuccess(response));
    } catch (e) {
        yield put(ACTION.getNotesQueryError(e));
    }
}

export function* createNote(action) {
	const defaultTitle = 'New Note...';

    try {
        const response = yield call(Api.createNote, {
        	title: defaultTitle
			,folderId: action.payload
		});
        yield put(ACTION.createNoteSuccess(response));
    } catch (e) {
        yield put(ACTION.createNoteError(e));
    }
}

export function* deleteNote(action) {
    try {
        const response = yield call(Api.deleteNote, action.payload);
        yield put(ACTION.deleteNoteSuccess(action.payload));

        // GO PARENT
        const pathname = window.location.pathname;
        const indexOfId = pathname.indexOf(action.payload);
        if(~indexOfId){
            yield put(push(`${pathname.slice(0,indexOfId)}`))
        }
    } catch (e) {
        yield put(ACTION.deleteNoteError(e));
    }
}

export function* onDrop(action) {
    try {
        const response = yield call(Api.onDrop, action.payload);
        yield put(ACTION.onDropSuccess(response));
    } catch (e) {
        yield put(ACTION.onDropError(e));
    }
}

// SAGAS
export default {
    * notesGetSaga() {
        yield takeLatest(TYPE.GET_NOTES, getItems);
    },
    * getNotesQuerySaga() {
        yield takeLatest(TYPE.GET_NOTES_QUERY, getNotesQuery);
    },
    * createNoteSaga() {
        yield takeLatest(TYPE.CREATE_NOTE, createNote);
    },
	* deleteNoteSaga() {
        yield takeLatest(TYPE.DELETE_NOTE, deleteNote);
    },
    * onDropSaga() {
        yield takeLatest(TYPE.ON_DROP, onDrop);
    },
    // †SAGA ...
}