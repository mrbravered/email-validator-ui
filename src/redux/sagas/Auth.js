import { put, take, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as duck from '../modules/Auth'

const getIsLoggedIn = (state) => state.auth.isLoggedIn

function * loginFlow () {
  while (true) {
    const isLoggedIn = yield select(getIsLoggedIn)
    if (!isLoggedIn) {
      const { token } = yield take(duck.LOGIN)
      localStorage.setItem('APIKey', token)
      yield put(push('/app/lists'))
    }
    yield take(duck.LOGOUT)
    localStorage.removeItem('APIKey')
    yield put(push('/app/login'))
  }
}

export default loginFlow
