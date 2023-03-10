import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import singleValidation from './modules/SingleValidation'
import bulkValidation from './modules/BulkValidation'
import auth from './modules/Auth'
import lists from './modules/Lists'
import EmailUpload from './modules/EmailUpload'
import excelFileSelector from './modules/ExcelFileSelector'
import user from './modules/User'

export default combineReducers({
  router,
  form,
  user,
  singleValidation,
  bulkValidation,
  auth,
  lists,
  EmailUpload,
  excelFileSelector,
})
