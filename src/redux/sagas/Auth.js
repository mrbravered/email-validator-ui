import { put, take, select, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as duck from '../modules/Auth'
import { login } from 'Api'

const getIsLoggedIn = (state) => state.auth.isLoggedIn

function * loginFlow () {
  while (true) {
    let isLoggedIn = yield select(getIsLoggedIn)
    while (!isLoggedIn) {
      const action = yield take(duck.LOGIN_REQUESTED)
      try {
        const { APIKey } = yield call(login, action.email, action.password)
        localStorage.setItem('APIKey', APIKey)
        localStorage.setItem('email', action.email)
        action.resolve()
        isLoggedIn = true
        yield put({type: duck.LOGIN_SUCEEDED, APIKey, email: action.email})
        yield put(push('/app/lists'))
      } catch (e) {
        action.reject({_error: e.message})
        yield put({type: duck.LOGIN_FAILED, error: e})
      }
    }
    yield take(duck.LOGOUT)
    localStorage.removeItem('APIKey')
    localStorage.removeItem('email')
    yield put(push('/app/login'))
  }
}

export default loginFlow
