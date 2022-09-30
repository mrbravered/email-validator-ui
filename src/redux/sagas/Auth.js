import { put, take, select, call, race } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as duck from '../modules/Auth'
import * as Api from 'Api'

const getIsLoggedIn = (state) => state.auth.currentUser.isLoggedIn

function * handleLoginSuccess (action, user) {
  localStorage.setItem('id', user.id)
  localStorage.setItem('APIKey', user.APIKey)
  localStorage.setItem('email', user.email)
  localStorage.setItem('role', user.role)
  action.resolve()
  yield put({type: duck.LOGIN_SUCEEDED, user: user})
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
          const receivedUser = yield call(Api.login, loginRequest.email, loginRequest.password)
          isLoggedIn = true
          yield * handleLoginSuccess(loginRequest, receivedUser)
        } catch (e) {
          yield * handleLoginFail(loginRequest, e)
        }
      } else {
        try {
          const receivedUser = yield call(Api.register, registerRequest.email, registerRequest.password)
          isLoggedIn = true
          yield * handleLoginSuccess(registerRequest, receivedUser)
        } catch (e) {
          yield * handleLoginFail(registerRequest, e)
        }
      }
    }
    yield take(duck.LOGOUT)
    localStorage.removeItem('id')
    localStorage.removeItem('APIKey')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    yield put(push('/app/login'))
  }
}

export default loginFlow
