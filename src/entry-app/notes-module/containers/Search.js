import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

//CUSTOM
import Search from '../components/Search'
// import {ACTION} from '../ducks/search'

@connect((state)=>({
        // options: state.notes.search.payload
    }),
    // {getSearch: ACTION.getSearch}
)
export default class SearchContainer extends Component {
    gotoNote=(value, event)=>{
        if(value && value.folderId){
            this.props.dispatch(push(`/notes/${value.folderId}/${value._id}`))
        }
    }

    gotoEntity =(value, event)=>{
        if(value && value._id !== 'tags'){
            this.props.dispatch(push(`/notes/search?type=${value._id}&q=${value.description}`))
        }

        if(value && value._id === 'tags'){
            this.props.dispatch(push(`/notes/tags?q=${value.description}`))
        }
    }

    render() {
        return (
            <Search {...this.props}
                    gotoEntity = {this.gotoEntity}
                    gotoNote = {this.gotoNote}
            />
        );
    }
}