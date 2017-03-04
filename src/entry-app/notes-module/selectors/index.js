// GLOBAL IMPORTS
// import { createSelector } from 'reselect'

export const folders = state => state.notes.folders.payload
export const foldersLoading = state => state.notes.folders.loading
export const foldersError = state => state.notes.folders.error

export const payloadResults = state => state.notes.folders.result
export const payloadFolders = state => state.notes.folders.folders

export const folderCreateLoading = state => state.notes.folders.loadingCreate
export const folderCreateError = state => state.notes.folders.errorCreate
export const isAddNew = state => state.notes.folders.isAddNew
export const loadingFolder = state => state.notes.folders.loadingFolder
export const editingFolder = state => state.notes.folders.editingFolder
export const loadingFolderId = state => state.notes.folders.loadingFolderId
export const loadingFolderError = state => state.notes.folders.loadingFolderError
export const editFolderTitle = state => state.notes.folders.editFolderTitle
export const createFolderTitle = state => state.notes.folders.createFolderTitle

export const notes = state => state.notes.notes.payload
export const notesLoading = state => state.notes.notes.loading
export const notesError = state => state.notes.notes.error
export const createLoading = state => state.notes.notes.createLoading
export const createError = state => state.notes.notes.createError
export const deleteNoteLoading = state => state.notes.notes.deleteNoteLoading
export const deleteNoteError = state => state.notes.notes.deleteNoteError
export const deleteNoteId = state => state.notes.notes.deleteNoteId

export const note = state => state.notes.note.payload
export const noteLoading = state => state.notes.note.loading
export const noteError = state => state.notes.note.error
export const noteErrorUpdate = state => state.notes.note.errorUpdate

export const tags = state => state.notes.tags.payload
export const tagsLoading = state => state.notes.tags.loading
export const tagsError = state => state.notes.tags.error