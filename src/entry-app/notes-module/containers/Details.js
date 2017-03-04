// †GLOBAL IMPORT
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'

// †CUSTOM IMPORT
import {ACTION} from '../ducks/note'
import * as selector from '../selectors'

import ViewComponent from '../components/Details'

export default connect(
    state => ({
        loading    : selector.noteLoading(state),
        item       : selector.note(state),
        error      : selector.noteError(state),
        errorUpdate: selector.noteErrorUpdate(state),
        deleteNoteId: selector.deleteNoteId(state),
    }),
    {
        getNote              : ACTION.getNote,
        updateNote           : ACTION.updateNote,
        updateNoteDescription: ACTION.updateNoteDescription,
        updateNoteTitle      : ACTION.updateNoteTitle,
        updateNoteTags       : ACTION.updateNoteTags,
    }
)(ViewComponent);