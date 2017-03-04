import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';

// LOCAL
import {ACTION} from '../ducks/tags'
import * as selector from '../selectors'
import Tags from '../components/Tags'

@connect(state => ({
        loading: selector.tagsLoading(state),
        tags   : selector.tags(state),
        error  : selector.tagsError(state),
    }),
    {
        getTags: ACTION.getTags,
    })
export default class Default extends Component {
    componentDidMount() {
        this.props.getTags(this.props.location.query.q)
    }

    componentWillUpdate(nextProps, nextState){
        // let {query: newQuery} = nextProps.location
        //     ,{query} = this.props.location
        //
        // if(newQuery.q !== query.q || newQuery.type !== query.type){
        //     this.props.getNotesQuery(newQuery)
        // }
    }

    render() {
        {/*return <Notes {...this.props} heading={this.getHeading()}/>*/}
        return <Tags {...this.props} />
    }
}