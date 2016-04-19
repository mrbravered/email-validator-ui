import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import singleValidation from './modules/SingleValidation'
import bulkValidation from './modules/BulkValidation'
import auth from './modules/Auth'

export default combineReducers({
  router,
  singleValidation,
  bulkValidation,
  auth
})
