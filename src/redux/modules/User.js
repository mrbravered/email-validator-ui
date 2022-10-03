// Constants
export const GET_USER_LIST_REQUESTED = 'auth/GET_USER_LIST_REQUESTED'
export const GET_USER_LIST_FAILED = 'auth/GET_USER_LIST_FAILED'
export const GET_USER_LIST_SUCEEDED = 'auth/GET_USER_LIST_SUCEEDED'

export const GET_USER_REQUESTED = 'auth/GET_USER_REQUESTED'
export const GET_USER_FAILED = 'auth/GET_USER_FAILED'
export const GET_USER_SUCEEDED = 'auth/GET_USER_SUCEEDED'

export const UPDATE_USER_REQUESTED = 'auth/UPDATE_USER_REQUESTED'
export const UPDATE_USER_FAILED = 'auth/UPDATE_USER_FAILED'
export const UPDATE_USER_SUCEEDED = 'auth/UPDATE_USER_SUCEEDED'

export const UPDATE_USER_PASSWORD_REQUESTED = 'auth/UPDATE_USER_PASSWORD_REQUESTED'
export const UPDATE_USER_PASSWORD_FAILED = 'auth/UPDATE_USER_PASSWORD_FAILED'
export const UPDATE_USER_PASSWORD_SUCEEDED = 'auth/UPDATE_USER_PASSWORD_SUCEEDED'

// Action Creators
export function getUserList() {
  return {
    type: GET_USER_LIST_REQUESTED,
  }
}

export function getUser(id) {
  return {
    type: GET_USER_REQUESTED,
    id
  }
}

export function updateUser(id, data) {
  return {
    type: UPDATE_USER_REQUESTED,
    id,
    data
  }
}

export function updateUserPassword(id, password) {
  return {
    type: UPDATE_USER_PASSWORD_REQUESTED,
    id,
    password
  }
}

// Reducer
export const initialState = {
  isFetching: false,
  users: [],
  user: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST_REQUESTED:
      return {
        ...state,
        isFetching: true,
      }
    case GET_USER_LIST_SUCEEDED:
      return {
        ...state,
        isFetching: false,
        users: action.users,
      }
    case GET_USER_LIST_FAILED:
      return {
        ...state,
        isFetching: false
      }
    case GET_USER_REQUESTED:
      return {
        ...state,
        isFetching: true,
      }
    case GET_USER_SUCEEDED:
      return {
        ...state,
        isFetching: false,
        user: action.user,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        isFetching: false
      }
    case UPDATE_USER_REQUESTED:
      return {
        ...state,
        isFetching: true,
      }
    case UPDATE_USER_SUCEEDED:
      return {
        ...state,
        isFetching: false,
        user: action.user,
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isFetching: false
      }
    case UPDATE_USER_PASSWORD_REQUESTED:
      return {
        ...state,
        isFetching: true,
      }
    case UPDATE_USER_PASSWORD_SUCEEDED:
      return {
        ...state,
        isFetching: false,
        user: action.user,
      }
    case UPDATE_USER_PASSWORD_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}
