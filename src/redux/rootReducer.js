import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import singleValidation from './modules/SingleValidation'
import bulkValidation from './modules/BulkValidation'
import auth from './modules/Auth'
import lists from './modules/Lists'

export default combineReducers({
  router,
  singleValidation,
  bulkValidation,
  auth,
  lists
})
