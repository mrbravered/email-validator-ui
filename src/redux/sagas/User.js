import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { getUserList } from 'Api'
import * as duck from '../modules/User'

function * fetchUserList (action) {
  try {
    const users = yield call(getUserList)
    yield put({type: duck.GET_USER_LIST_SUCEEDED, users: users})
  } catch (error) {
    yield put({type: duck.LISTS_FETCH_FAILED, error: error.message})
  }
}

export default function * UserListSaga () {
  yield [
    takeLatest(duck.GET_USER_LIST_REQUESTED, fetchUserList),
  ]
}
