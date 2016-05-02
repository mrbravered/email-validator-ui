import { fork } from 'redux-saga/effects'
import { watchValidate } from './SingleValidation'
import { watchBulkValidate } from './BulkValidation'
import listsSaga from './Lists'
import authSaga from './Auth'

export default function * () {
  yield fork(watchValidate)
  yield fork(watchBulkValidate)
  yield fork(listsSaga)
  yield fork(authSaga)
}
