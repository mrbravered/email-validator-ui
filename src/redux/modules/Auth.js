import { push } from 'react-router-redux'

// Constants
export const LOGIN = 'email-validator-ui/auth/LOGIN'
export const LOGOUT = 'email-validator-ui/auth/LOGOUT'

// Action Creators
export function login (token) {
  return (dispatch) => {
    localStorage.setItem('APIKey', token)
    dispatch({type: LOGIN})
    dispatch(push('/app/single-email-validation'))
  }
}

export function logout () {
  return (dispatch) => {
    localStorage.removeItem('APIKey')
    dispatch({type: LOGOUT})
    dispatch(push('/app/login'))
  }
}

// Reducer
export const initialState = {
  isLoggedIn: Boolean(localStorage.getItem('APIKey'))
}
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {isLoggedIn: true})
    case LOGOUT:
      return Object.assign({}, state, {isLoggedIn: false})
    default:
      return state
  }
}
