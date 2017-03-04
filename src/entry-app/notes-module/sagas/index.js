// CUSTOM IMPORTS
import folders from './folders'
import notes from './notes'
import note from './note'
import tags from './tags'

// single entry point to start all Sagas at once
export default [
	folders,
    notes,
    note,
    tags,
]