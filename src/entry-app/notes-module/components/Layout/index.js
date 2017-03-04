// †GLOBAL IMPORTS
import React, {Component} from 'react'
import className from 'classnames'
//--<MATERIAL UI
//TOUCH EVENTS !!! REQUIRED
//http://www.material-ui.com/#/get-started/installation
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//styles
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {cyan500} from 'material-ui/styles/colors';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//-- MATERIAL UI/>

// †CUSTOM IMPORTS
import './Layout.global.css'

export default class Layout extends Component {
    render() {
        const {params}       = this.props;
        const isFolderOpened = Object.keys(params).length <= 1
        const cssClass = className({
            'container'     : true,
            'folder--opened': isFolderOpened,
        });
        const {props}  = this;

        return (
            // <div styleName='root'> {/* css4 style */}
            <div className="root"> {/* css global */}
                <MuiThemeProvider>
                    <section className={cssClass}>
                        <div className="toolbox">
                            {props.Toolbox}
                        </div>
                        <div className="folders">
                            {props.Folders}
                        </div>
                        <div className="notes">
                            {props.Search}
                            {props.Notes}
                            {props.Titles}
                            {props.Tags}
                        </div>
                        <div className="content">
                            {props.Details}
                        </div>
                    </section>
                </MuiThemeProvider>
                {/*<footer>© Roman Yudin</footer>*/}
            </div>
        )
    }
}