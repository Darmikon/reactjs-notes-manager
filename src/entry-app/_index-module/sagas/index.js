// GLOBAL IMPORTS
import {formActionSaga} from 'redux-form-saga'

// CUSTOM IMPORTS
import {sagas as notesSagas} from '~/notes-module'
import {combineSagas} from '/common/saga-helper-module'


export default combineSagas(
	//†sagas here
	notesSagas,
    formActionSaga,
)