// †GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react'

// †CUSTOM IMPORTS
// ...

export default class Notes extends Component {
    static propTypes = {
        error: PropTypes.object,
        loading: PropTypes.bool,
        renderer: PropTypes.func.isRequired,
    }

    render() {
        const {props}  = this
        const {error, loading, renderer, css} = props

        return (
            <div style = {css || {}}>
                {loading && 'loading...'}
                {error && 'Server error happened'}
                {!loading && !error && renderer()}
            </div>
        )
    }
}