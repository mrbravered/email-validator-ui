import { spawn } from 'redux-saga/effects'
import { watchValidate } from './SingleValidation'
import { watchBulkValidate } from './BulkValidation'
import listsSaga from './Lists'
import authSaga from './Auth'
import { watchEmailUpload } from './EmailUpload'
import UserListSaga from './User'
import excelFileSelector from './ExcelFileSelector'

export default function * () {
  yield spawn(watchValidate)
  yield spawn(watchBulkValidate)
  yield spawn(listsSaga)
  yield spawn(authSaga)
  yield spawn(watchEmailUpload)
  yield spawn(excelFileSelector)
  yield spawn(UserListSaga)
}
