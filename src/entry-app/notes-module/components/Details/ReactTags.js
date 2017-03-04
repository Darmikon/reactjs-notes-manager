// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react'
import {WithContext as ReactTags} from 'react-tag-input';

// †CUSTOM IMPORTS
import tagscss from './reactTags.css'

const reactTagsStyles = {
    tags         : tagscss['ReactTags__tags'],
    tagInput     : tagscss['ReactTags__tagInput'],
    tagInputField: tagscss['ReactTags__tagInputField'],
    selected     : tagscss['ReactTags__selected'],
    tag          : tagscss['ReactTags__tag'],
    remove       : tagscss['ReactTags__remove'],
    suggestions  : tagscss['ReactTags__suggestions']
}

export default class Details extends Component {
    static propTypes = {
        tags              : PropTypes.array,
        onChange          : PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tags       : [{id: 1, text: "Apples"}],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    }

    handleDelete   = (i) => {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }
    handleAddition = (tag) => {
        let tags = this.state.tags;
        tags.push({
            id  : tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }
    handleDrag     = (tag, currPos, newPos) => {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: tags});
    }

    handleInputChange = (e)=>{
         // console.log(e);
    }

    render() {
        const {loading, error, item} = this.props

        let tags        = this.state.tags;
        let suggestions = this.state.suggestions;

        return (
            <ReactTags tags={tags}
                       suggestions={suggestions}
                       handleDelete={this.handleDelete}
                       handleAddition={this.handleAddition}
                       handleDrag={this.handleDrag}
                       autofocus={false}
                       handleInputChange={this.handleInputChange}
                       classNames={reactTagsStyles}/>
        )
    }
}