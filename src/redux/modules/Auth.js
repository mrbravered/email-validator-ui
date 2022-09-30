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
  loginFailed: false,
  isFetching: false,
  currentUser: {
    isLoggedIn: Boolean(localStorage.getItem('APIKey')),
    id: localStorage.getItem('id'),
    APIKey: localStorage.getItem('APIKey'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
  }
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
        currentUser: {
          ...action.user,
          isLoggedIn: true,
        }
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: true,
        isFetching: false,
        currentUser: {
          ...state.user,
          isLoggedIn: false,
        }
      }
    case LOGOUT:
      return {
        ...state,
        loginFailed: false,
        currentUser: {
          id: '',
          APIKey: '',
          email: '',
          role: '',
          isLoggedIn: false,
        }
      }
    default:
      return state
  }
}
