// Constants
export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED'
export const LOGIN_FAILED = 'auth/LOGIN_FAILED'
export const LOGIN_SUCEEDED = 'auth/LOGIN_SUCEEDED'
export const LOGOUT = 'auth/LOGOUT'

// Action Creators
export function login (token) {
  return {
    type: LOGIN_REQUESTED,
    token: token
  }
}

export function logout () {
  return {type: LOGOUT}
}

// Reducer
export const initialState = {
  isLoggedIn: Boolean(localStorage.getItem('APIKey')),
  loginFailed: false,
  isFetching: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        isFetching: true,
        loginFailed: false
      }
    case LOGIN_SUCEEDED:
      return {
        ...state,
        isLoggedIn: true,
        loginFailed: false,
        isFetching: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loginFailed: true,
        isFetching: false
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loginFailed: false
      }
    default:
      return state
  }
}
