import React, {Component, PropTypes} from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {connect} from 'react-redux';

// LOCAL
// import api from '/common/api-module'
import Notes from '../components/Notes'
import {ACTION} from '../ducks/notes'
import * as selector from '../selectors'


@connect(state => ({
        loading          : selector.notesLoading(state),
        notes            : selector.notes(state),
        error            : selector.notesError(state),
        createError      : selector.createError(state),
        createLoading    : selector.createLoading(state),
        deleteNoteError  : selector.deleteNoteError(state),
        deleteNoteLoading: selector.deleteNoteLoading(state),
    }),
    {
        getNotes     : () => ({type: '__MOCK__'}),
        getNotesQuery: ACTION.getNotesQuery,
        createNote   : () => ({type: '__MOCK__'}),
        deleteNote   : ACTION.deleteNote,
        moveNote     : ACTION.moveNote,
        onDrop       : () => ({type: '__MOCK__'}),
    })
// @DragDropContext(HTML5Backend)
export default class Default extends Component {
    componentDidMount() {
        this.props.getNotesQuery(this.props.location.query)
    }

    componentWillUpdate(nextProps, nextState){
        let {query: newQuery} = nextProps.location
            ,{query} = this.props.location

        if(newQuery.q !== query.q || newQuery.type !== query.type){
            this.props.getNotesQuery(newQuery)
        }
    }

    getHeading(){
        let {query} = this.props.location
        return `Found ${query.q} by ${query.type}`
    }

    render() {
        return <Notes {...this.props} heading={this.getHeading()}/>
    }
}