import { put, take, select, call, race } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as duck from '../modules/Auth'
import * as Api from 'Api'

const getIsLoggedIn = (state) => state.auth.isLoggedIn

function * handleLoginSuccess (action, APIKey) {
  localStorage.setItem('APIKey', APIKey)
  localStorage.setItem('email', action.email)
  action.resolve()
  yield put({type: duck.LOGIN_SUCEEDED, APIKey, email: action.email})
  yield put(push('/app/lists'))
}

function * handleLoginFail (action, e) {
  action.reject({_error: e.message})
  yield put({type: duck.LOGIN_FAILED, error: e})
}

function * loginFlow () {
  while (true) {
    let isLoggedIn = yield select(getIsLoggedIn)
    while (!isLoggedIn) {
      // Not logged in. Let's wait for either a login request
      // or a register request.
      const { loginRequest, registerRequest } = yield race({
        loginRequest: take(duck.LOGIN_REQUESTED),
        registerRequest: take(duck.REGISTER_REQUESTED)
      })

      if (loginRequest) {
        try {
          const { APIKey } = yield call(Api.login, loginRequest.email, loginRequest.password)
          isLoggedIn = true
          yield * handleLoginSuccess(loginRequest, APIKey)
        } catch (e) {
          yield * handleLoginFail(loginRequest, e)
        }
      } else {
        try {
          const { APIKey } = yield call(Api.register, registerRequest.email, registerRequest.password)
          isLoggedIn = true
          yield * handleLoginSuccess(registerRequest, APIKey)
        } catch (e) {
          yield * handleLoginFail(registerRequest, e)
        }
      }
    }
    yield take(duck.LOGOUT)
    localStorage.removeItem('APIKey')
    localStorage.removeItem('email')
    yield put(push('/app/login'))
  }
}

export default loginFlow
