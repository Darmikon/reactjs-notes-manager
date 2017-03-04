// GLOBAL IMPORTS
import { call, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects'
import {push} from 'react-router-redux';
// CUSTOM IMPORTS
import api from '/common/api-module'
import {TYPE, ACTION} from '../ducks/note'

// API
export const Api = {
    getNote: noteId =>
        api.get('notes/:noteId',{noteId})
            .spread(data=>data),

    updateNote: data=>
        api.post('notes/:noteId',{noteId: data.noteId},{...data})
            .spread(data=>data)
}

// GENERATORS
export function* getNote(action) {
    try {
        const response = yield call(Api.getNote, action.payload);
        yield put(ACTION.getNoteSuccess(response));
    } catch (e) {
        yield put(ACTION.getNoteError(e));

        if(e.statusCode === 404){
            yield put(push(`/notes`))
        }
    }
}

export function* updateNote(action) {
    try {
        const response = yield call(Api.updateNote, action.payload);
        yield put(ACTION.updateNoteSuccess(response));
    } catch (e) {
        yield put(ACTION.updateNoteError(e));

        if(e.statusCode === 404){
            yield put(push(`/notes`))
        }
    }
}

// SAGAS
export default {
    * noteGetSaga() {
        yield takeLatest(TYPE.GET_NOTE, getNote);
    },
    * updateNoteSaga() {
        yield throttle(1000, TYPE.UPDATE_NOTE, updateNote);
    }
    // †SAGA ...
}