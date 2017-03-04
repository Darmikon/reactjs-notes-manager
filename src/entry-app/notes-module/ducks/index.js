// GLOBAL IMPORTS
import {combineReducers} from 'redux';

// CUSTOM IMPORTS
import folders from './folders'
import notes from './notes'
import note from './note'
import search from './search'
import tags from './tags'

export default combineReducers({
	folders,
	notes,
	note,
	search,
	tags,
	//†reducer
});