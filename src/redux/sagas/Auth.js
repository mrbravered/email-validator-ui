import { put, take, select, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as duck from '../modules/Auth'
import { authorize } from 'Api'

const getIsLoggedIn = (state) => state.auth.isLoggedIn

function * loginFlow () {
  while (true) {
    let isLoggedIn = yield select(getIsLoggedIn)
    while (!isLoggedIn) {
      const { token } = yield take(duck.LOGIN_REQUESTED)
      const validToken = yield call(authorize, token)
      if (validToken) {
        localStorage.setItem('APIKey', token)
        isLoggedIn = true
        yield put({type: duck.LOGIN_SUCEEDED})
        yield put(push('/app/lists'))
      } else {
        yield put({type: duck.LOGIN_FAILED})
      }
    }
    yield take(duck.LOGOUT)
    localStorage.removeItem('APIKey')
    yield put(push('/app/login'))
  }
}

export default loginFlow
