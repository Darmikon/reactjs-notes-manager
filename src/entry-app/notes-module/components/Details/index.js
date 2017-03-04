// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react'
import TextField from 'material-ui/TextField';
import IconSave from 'react-icons/lib/md/save';
import debounce from 'lodash/debounce'
// import {WithContext as ReactTags} from 'react-tag-input';

// †CUSTOM IMPORTS
import View from '../View'
import Tags from './Tags'
import Autocomplete from './Autocomplete'

export default class Details extends Component {
    static propTypes = {
        loading              : PropTypes.bool,
        error                : PropTypes.object,
        item                 : PropTypes.object.isRequired,
        getNote              : PropTypes.func.isRequired,
        updateNote           : PropTypes.func.isRequired,
        errorUpdate          : PropTypes.object,
        updateNoteDescription: PropTypes.func.isRequired,
        updateNoteTitle      : PropTypes.func.isRequired,
        updateNoteTags       : PropTypes.func.isRequired,
    }

    componentWillUpdate(nextProps) {
        if (nextProps.params.noteId !== this.props.params.noteId) {
            this.props.getNote(nextProps.params.noteId)
        }
    }

    onChange      = (e) => {
        this.props.updateNoteDescription(e.currentTarget.value)
        this.props.updateNote({
            ...this.props.item,
            description: e.currentTarget.value,
            noteId     : this.props.params.noteId
        })
        // this.debouncedUpdateNote(e)
    }
    onTitleChange = (e) => {
        this.props.updateNoteTitle(e.currentTarget.value)
        this.props.updateNote({
            ...this.props.item,
            title : e.currentTarget.value,
            noteId: this.props.params.noteId
        })
        // this.debouncedUpdateNote(e)
    }
    onTagChange = (newTag)=>{
        let newTags = [];

        if(this.props.item.tags.filter(tag=>tag.title === newTag.title).length){
            return;
        }

        if(newTag._id === null){
            newTags = [].concat(this.props.item.tags.filter(o=>o._id !== null),newTag)
        }else{
            newTags = [].concat(this.props.item.tags,newTag)
        }

        this.props.updateNote({
            ...this.props.item,
            tags: newTags,
            noteId: this.props.params.noteId
        })
    }

    onRemoveTag =(id)=>{
        const tags = this.props.item.tags.filter(o=>o._id !== id)
        //optimistic update
        this.props.updateNoteTags(tags)

        this.props.updateNote({
            ...this.props.item,
            tags,
            noteId: this.props.params.noteId
        })
    }

    componentDidMount() {
        const {props} = this
        props.getNote(props.params.noteId)
    }

    componentWillMount() {
        // this.debouncedUpdateNote = debounce(this.triggerUpdate, 2000)
    }

    renderNote = () => {
        const note = this.props.item;

        return (<div style={{flex: 1}}>
            {this.props.errorUpdate && 'Server problems...'}

            {/*<Editor*/}
            {/*value={this.props.item.description}*/}
            {/*onChange={this.onChange} />*/}

            <TextField
                multiLine={true}
                rows={2}
                placeholder= "Text..."
                name="note-description"
                value={this.props.item.description}
                onChange={this.onChange}
                fullWidth={true}/>
        </div>)
    }

    render() {
        const {loading, error, item} = this.props

        return (
            <div className="content-space">
                <div className="content-title">
                    <h5 className="details-title">
                        {/*<INoteAdd styleName = "note-add"*/}
                        <TextField
                            rows={2}
                            placeholder="Note title"
                            name="note-description"
                            value={this.props.item.title}
                            onChange={this.onTitleChange}/>
                    </h5>
                    {item.tags &&
                    <Tags tags = {this.props.item.tags}
                          onRemove={this.onRemoveTag} />}
                    <Autocomplete onSelect = {this.onTagChange}/>
                </div>
                {/*...*/}
                {/*<Editor editorState={this.state.editorState} onChange={this.onChange2} />*/}
                {/*....*/}

                <View loading={loading}
                      renderer={this.renderNote}
                      error={error}/>
            </div>
        )
    }
}