import { spawn } from 'redux-saga/effects'
import { watchValidate } from './SingleValidation'
import { watchBulkValidate } from './BulkValidation'
import listsSaga from './Lists'
import authSaga from './Auth'
import excelFileSelector from './ExcelFileSelector'

export default function * () {
  yield spawn(watchValidate)
  yield spawn(watchBulkValidate)
  yield spawn(listsSaga)
  yield spawn(authSaga)
  yield spawn(excelFileSelector)
}
