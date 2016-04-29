import { getLists } from 'Api'

// Constants
export const FETCH_LISTS = 'lists/FETCH_LISTS'
export const LISTS_RECEIVED = 'lists/LISTS_RECEIVED'
export const LISTS_FETCH_FAILED = 'lists/LISTS_FETCH_FAILED'

// Action Creators
export function receiveLists (lists) {
  return {
    type: LISTS_RECEIVED,
    lists: lists
  }
}

export function fetchLists () {
  return function (dispatch) {
    dispatch({type: FETCH_LISTS})
    getLists()
      .then((lists) => {
        dispatch(receiveLists(lists))
      })
      .catch((error) => {
        dispatch({type: LISTS_FETCH_FAILED, error: error.message})
      })
  }
}

// Reducer
export const initialState = {
  isFetching: false,
  error: '',
  lists: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        ...state,
        isFetching: true
      }
    case LISTS_RECEIVED:
      return {
        isFetching: false,
        lists: action.lists,
        error: ''
      }
    case LISTS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default: return state
  }
}
