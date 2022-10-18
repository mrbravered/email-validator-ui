import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { getUserList, getUser, updateUser, updateUserPassword } from 'Api'
import * as duck from '../modules/User'

function * fetchUserList (action) {
  try {
    const users = yield call(getUserList)
    yield put({type: duck.GET_USER_LIST_SUCEEDED, users: users})
  } catch (error) {
    yield put({type: duck.LISTS_FETCH_FAILED, error: error.message})
  }
}

function * fetchUser (action) {
  try {
    const user = yield call(getUser, action.id)
    yield put({type: duck.GET_USER_SUCEEDED, user: user})
  } catch(error) {
    yield put({type: duck.GET_USER_FAILED, error: error.message})
  }
}

function * fetchUpdateUser (action) {
  try {
    const user = yield call(updateUser, action.id, action.data)
    yield put({type: duck.UPDATE_USER_SUCEEDED, user: user})
    yield put(push(`/app/users`))
  } catch(error) {
    yield put({type: duck.UPDATE_USER_FAILED, error: error.message})
  }
}

function * fetchUpdateUserPassword (action) {
  try {
    const user = yield call(updateUserPassword, action.id, action.password)
    yield put({type: duck.UPDATE_USER_PASSWORD_SUCEEDED, user: user})
    yield put(push(`/app/users/${action.id}`))
  } catch(error) {
    yield put({type: duck.UPDATE_USER_PASSWORD_FAILED, error: error.message})
  }
}

export default function * UserListSaga () {
  yield [
    takeLatest(duck.GET_USER_LIST_REQUESTED, fetchUserList),
    takeLatest(duck.GET_USER_REQUESTED, fetchUser),
    takeLatest(duck.UPDATE_USER_REQUESTED, fetchUpdateUser),
    takeLatest(duck.UPDATE_USER_PASSWORD_REQUESTED, fetchUpdateUserPassword),
  ]
}
