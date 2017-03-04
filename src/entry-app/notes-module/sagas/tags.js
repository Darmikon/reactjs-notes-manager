// GLOBAL IMPORTS
import { call, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects'
import {push} from 'react-router-redux';
// CUSTOM IMPORTS
import api from '/common/api-module'
import {TYPE, ACTION} from '../ducks/tags'

// API
export const Api = {
    getTags: q =>
        api.get('tags?q=:q',{q})
            .spread(data=>data),
}

// GENERATORS
export function* getTags(action) {
    try {
        const response = yield call(Api.getTags, action.payload);
        yield put(ACTION.getTagsSuccess(response));
    } catch (e) {
        yield put(ACTION.getTagsError(e));

        if(e.statusCode === 404){
            yield put(push(`/notes`))
        }
    }
}

// SAGAS
export default {
    * getTagsSaga() {
        yield takeLatest(TYPE.GET_TAGS, getTags);
    },
    // †SAGA ...
}