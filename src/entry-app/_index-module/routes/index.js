import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router'; // eslint-disable-line no-unused-vars

import NotFound from '../components/NotFound';

//ROUTES
// import {routes as Webmaster} from '~/_webmaster-module';
import {routes as Notes} from '~/notes-module';

const routes = (
    <Route path="/">
        <IndexRedirect to = "notes" />
        {/*<Route path = "webmaster" component = {Webmaster} />*/}
        {/* ... routes will go here ...*/}
        {Notes}
        <Route path='*' component={NotFound}/> {/* to show 404 without layout */}
    </Route>
)

export default routes