import React, {Component, PropTypes} from 'react'
import css from './Underline.mod.css';
import classnames from 'classnames';
export {css as MaterialCSS}

const blurStyles = {}

export class Underline extends Component{
    static propTypes = {
        focus: PropTypes.bool.isRequired
    }
    render(){
        const bgLine = classnames(css.underline, {
            [css.visible]: true
        })

        const frLine = classnames(css.underlineFocused,{
            [css.visible]: this.props.focus
        })

        return (
            <div>
                <hr className = {bgLine} />
                <hr className = {frLine} />
            </div>
        )
    }
}