import React, { Component, PropTypes } from 'react'
// import ICancel from 'react-icons/lib/md/cancel';
import Chip from 'material-ui/Chip';

export default class Tags extends Component {
    static propTypes = {
        tags: PropTypes.array.isRequired,
        onRemove: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)

        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    render() {
        const {tags, onRemove} = this.props;

        return (
            <div style = {{display: 'flex'}}>
                {tags.map(tag=>
                    <Chip
                        key={tag._id}
                        onRequestDelete={() => this.props.onRemove(tag._id)}
                        style={this.styles.chip}>
                        {tag.title}
                    </Chip>
                )}

                {/*<div className="tooltip tooltip--top"*/}
                     {/*onClick = {()=>onRemove(tag._id)}*/}
                     {/*key = {tag._id}*/}
                     {/*data-tooltip="Remove">*/}
                    {/*{tag.title}*/}
                    {/*<ICancel size={16}/>*/}
                {/*</div>*/}

            </div>
        )
    }
}