// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// †CUSTOM IMPORTS
import {ACTION} from '../ducks/notes'
import * as selector from '../selectors'
import ViewComponent from '../components/Notes'

export default connect(
    state => ({
        loading          : selector.notesLoading(state),
        notes            : selector.notes(state),
        error            : selector.notesError(state),
        createError      : selector.createError(state),
        createLoading    : selector.createLoading(state),
        deleteNoteError  : selector.deleteNoteError(state),
        deleteNoteLoading: selector.deleteNoteLoading(state),
    }),
    {
        getNotes  : ACTION.getNotes,
        createNote: ACTION.createNote,
        deleteNote: ACTION.deleteNote,
        moveNote  : ACTION.moveNote,
        onDrop    : ACTION.onDrop,
    }
// )(DragDropContext(HTML5Backend)(ViewComponent));
)(ViewComponent);