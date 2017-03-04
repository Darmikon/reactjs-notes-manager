// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import INoteAdd from 'react-icons/lib/md/note-add';
import IInsertDriveFile from 'react-icons/lib/md/insert-drive-file';
import ICancel from 'react-icons/lib/md/cancel';
import Paper from 'material-ui/Paper';

// †CUSTOM IMPORTS
import View from '../View';
import './Notes.global.css'
import Card from './Card';

const activeLink = {color: 'inherit', fontWeight: 'bold', textDecoration: 'none', cursor: 'default'}

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Notes extends Component {
    static propTypes = {
        loading          : PropTypes.bool,
        error            : PropTypes.object,
        notes            : PropTypes.array.isRequired,
        getNotes         : PropTypes.func.isRequired,
        createNote       : PropTypes.func.isRequired,
        createLoading    : PropTypes.bool.isRequired,
        createError      : PropTypes.object,
        deleteNote       : PropTypes.func.isRequired,
        deleteNoteLoading: PropTypes.bool.isRequired,
        deleteNoteError  : PropTypes.object,
        deleteNoteId     : PropTypes.string,
        moveNote         : PropTypes.func.isRequired,
        onDrop           : PropTypes.func.isRequired,
        heading          : PropTypes.string,
    }

    // constructor(props){
    // 	super(props);
    // }
    componentDidMount() {
        let {folderId} = this.props.params

        this.props.getNotes(folderId)
    }

    componentWillUpdate(nextProps) {
        let {folderId} = this.props.params

        if (nextProps.params.folderId !== folderId) {
            this.props.getNotes(nextProps.params.folderId)
        }
    }

    renderNotes = () => {
        const {props} = this
        const {params, notes, error, loading, deleteNoteLoading, deleteNoteError, deleteNoteId} = props

        return notes.map((note, i) => (
            <div key={note._id}>
                <Card key={note._id}
                      index={i}
                      id={note._id}
                      component={this.renderNote(note)}
                      text={note.title}
                      moveCard={(dragIndex, hoverIndex) => {
                          this.props.moveNote({dragIndex, hoverIndex})
                      }}
                      onDrop={() => this.props.onDrop(this.props.notes)}/>
            </div>
        ))
    }

    renderNote = (note) => {
        const {props} = this
        const {
            params, notes,
            error, loading,
            deleteNoteLoading,
            deleteNoteError, deleteNoteId
        } = props

        return (<Paper className="media"
                        zDepth={1}>
            <div className="media__item">
                <IInsertDriveFile size={30}/>
            </div>
            <div className="media__body">
                <h6>
                    {!(deleteNoteLoading && deleteNoteId == note._id) &&
                    <Link to={`/notes/${note.folderId}/${note._id}`}
                          key={note._id}
                          activeStyle={activeLink}>
                        {note.title}
                    </Link>}

                    <div>{deleteNoteLoading && deleteNoteId == note._id && 'deleting...'}</div>
                    <div>{deleteNoteError && deleteNoteId == note._id && 'try again'}</div>
                </h6>
            </div>
            {!(deleteNoteLoading && deleteNoteId == note._id) &&
            <div className="tooltip tooltip--top media__remove"
                 data-tooltip="Remove"
                 style={{cursor: 'pointer'}}
                 onClick={() => this.props.deleteNote(note._id)}>
                <ICancel size={16}/>
            </div>}
        </Paper>)
    }

    render() {
        const {props} = this
        const {params, notes, error, loading} = props

        return (
            <div className="content-space">
                <div className="content-title">
                    {!this.props.heading &&
                    <h5 className="notes-title">
                        Notes
                        <div className="tooltip tooltip--bottom note-add"
                             onClick={() => !props.createLoading && props.createNote(props.params.folderId)}
                             data-tooltip="Create note">
                            <INoteAdd
                                size={30}/>
                        </div>
                    </h5>
                    }

                    {this.props.heading &&
                    <h5 className="notes-title">
                        {this.props.heading}
                    </h5>
                    }

                </div>

                {props.createLoading && 'Creating...'}
                {props.createError && 'Creating failed'}

                <div className="media__zone">
                    <View loading={loading}
                          error={error}
                          css = {{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}
                          renderer={this.renderNotes}/>
                </div>
            </div>
        )
    }
}