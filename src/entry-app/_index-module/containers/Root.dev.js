import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//ROUTER MODE
import { Router, browserHistory, hashHistory } from 'react-router'; // eslint-disable-line no-unused-vars
import { syncHistoryWithStore } from 'react-router-redux';

//DEV TOOLS
import DevTools from './DevTools';

//APP
import configureStore from '../store/configureStore';
import routes from '../routes'

const store = configureStore();
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store); //HTML5 history
// const history = syncHistoryWithStore(hashHistory, store);

class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store = {store}>
                {/*<App />*/}
                <div>
                    <Router history = {history}
                            routes  = {routes} />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

export default function(){
    // return ;
    render(
        <Root store={store} />,
        document.getElementById('root')
    );
}
