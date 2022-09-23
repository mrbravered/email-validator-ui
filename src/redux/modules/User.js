// Constants
export const GET_USER_LIST_REQUESTED = 'auth/GET_USER_LIST_REQUESTED'
export const GET_USER_LIST_FAILED = 'auth/GET_USER_LIST_FAILED'
export const GET_USER_LIST_SUCEEDED = 'auth/GET_USER_LIST_SUCEEDED'

// Action Creators
export function getUserList() {
  return {
    type: GET_USER_LIST_REQUESTED,
  }
}

// Reducer
export const initialState = {
  isFetching: false,
  users: []
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
    default:
      return state
  }
}
