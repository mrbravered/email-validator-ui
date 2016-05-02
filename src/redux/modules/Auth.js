// Constants
export const LOGIN = 'auth/LOGIN'
export const LOGOUT = 'auth/LOGOUT'

// Action Creators
export function login (token) {
  return {type: LOGIN, token: token}
}

export function logout () {
  return {type: LOGOUT}
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
