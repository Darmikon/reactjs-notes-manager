// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

// †CUSTOM IMPORTS
import {ACTION} from '../ducks/folders'
import * as selector from '../selectors'
import ViewComponent from '../components/Folders'

export default connect(
    state => ({
        loading           : selector.foldersLoading(state),
        // items             : selector.folders(state),
        payload           : selector.folders(state),
        error             : selector.foldersError(state),
        loadingCreate     : selector.folderCreateLoading(state),
        errorCreate       : selector.folderCreateError(state),
        isAddNew          : selector.isAddNew(state),
        loadingFolder     : selector.loadingFolder(state),
        editingFolder     : selector.editingFolder(state),
        loadingFolderId   : selector.loadingFolderId(state),
        loadingFolderError: selector.loadingFolderError(state),
        editFolderTitle   : selector.editFolderTitle(state),
        createFolderTitle : selector.createFolderTitle(state),
        payloadResults    : selector.payloadResults(state),
        payloadFolders    : selector.payloadFolders(state),
    }),
    {
        getFolders       : ACTION.getFolders,
        createFolder     : ACTION.createFolder,
        addNew           : ACTION.addNew,
        deleteFolder     : ACTION.deleteFolder,
        editFolder       : ACTION.editFolder,
        updateFolder     : ACTION.updateFolder,
        updateFolderField: ACTION.updateFolderField,
        updateCreateField: ACTION.updateCreateField,
        undoEdit         : ACTION.undoEdit,
        undoCreate       : ACTION.undoCreate,
        showFolder       : ACTION.showFolder,
        toggleFolder     : ACTION.toggleFolder,
    }
)(ViewComponent);