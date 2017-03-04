// All reducers of <entry-app>
import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';

//REDUCERS
import {reducer as notes} from '~/notes-module';
//†import

const rootReducer = combineReducers({
    routing,
    form,
    //..reducers will go here
    //...
    notes,
    //†reducer
});

export default rootReducer;