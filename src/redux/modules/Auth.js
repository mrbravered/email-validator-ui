// Constants
export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED'
export const LOGIN_FAILED = 'auth/LOGIN_FAILED'
export const LOGIN_SUCEEDED = 'auth/LOGIN_SUCEEDED'
export const LOGOUT = 'auth/LOGOUT'

export const REGISTER_REQUESTED = 'auth/REGISTER_REQUESTED'

// Action Creators
export function login (email, password, resolve, reject) {
  return {
    type: LOGIN_REQUESTED,
    email,
    password,
    resolve,
    reject
  }
}

export function logout () {
  return {type: LOGOUT}
}

export function register (email, password, resolve, reject) {
  return {
    type: REGISTER_REQUESTED,
    email,
    password,
    resolve,
    reject
  }
}

// Reducer
export const initialState = {
  isLoggedIn: Boolean(localStorage.getItem('APIKey')),
  loginFailed: false,
  isFetching: false,
  APIKey: localStorage.getItem('APIKey'),
  email: localStorage.getItem('email'),
  role: localStorage.getItem('role'),
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
        isFetching: false,
        APIKey: action.user.APIKey,
        email: action.user.email,
        role: action.user.role,
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
        loginFailed: false,
        APIKey: '',
        email: '',
        role: '',
      }
    default:
      return state
  }
}
