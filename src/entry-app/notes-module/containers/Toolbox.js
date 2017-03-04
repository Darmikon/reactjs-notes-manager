// GLOBAL IMPORTS
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux';

// CUSTOM IMPORTS
// import {ACTION} from '../ducks/...'
// import * as selector from '../selectors'

import ViewComponent from '../components/Toolbox'

export default connect(
    state => ({
        //...
    }),
    (dispatch)=>({
        // ...
        goBack(folderId){
            dispatch(push(`/notes/${folderId}`))
        }
    })
)(ViewComponent);