import React, {Component, PropTypes} from 'react'
import Chip from 'material-ui/Chip';
import {Link} from 'react-router';
import IInsertDriveFile from 'react-icons/lib/md/insert-drive-file';

import View from '../View'

const activeLink = {color: 'inherit', fontWeight: 'bold', textDecoration: 'none', cursor: 'default'}

export default class Default extends Component{
    static propTypes = {
        tags: PropTypes.array.isRequired
    }

    renderTags = () => {
        const {props} = this
        const {params, tags, error, loading} = props

        return tags.map(tag => this.renderTag(tag))
    }

    renderTag = (tag) => {
        const {props} = this
        const {
            params,
            error, loading,
        } = props

        return (
            <Chip
                key={tag._id}>
                <Link to={`/notes/search?type=tags&q=${tag.title}`}
                      key={tag._id}
                      activeStyle={activeLink}>
                    {tag.title}
                </Link>
            </Chip>
        )
    }

    render() {
        const {props} = this
        const {params, notes, error, loading} = props

        return (
            <div className="content-space">
                <div className="content-title">
                    <h5 className="notes-title">
                        Tags
                    </h5>
                </div>

                <div className="media__zone">
                    <View loading={loading}
                          error={error}
                          css = {{display: 'flex', flexWrap: 'wrap'}}
                          renderer={this.renderTags}/>
                </div>
            </div>
        )
    }
}