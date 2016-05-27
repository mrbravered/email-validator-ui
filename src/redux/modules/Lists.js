import orderBy from 'lodash/orderBy'
import { LOGOUT } from 'redux/modules/Auth'

// Constants
export const FETCH_LISTS = 'lists/FETCH_LISTS'
export const LISTS_RECEIVED = 'lists/LISTS_RECEIVED'
export const LISTS_FETCH_FAILED = 'lists/LISTS_FETCH_FAILED'
export const DOWNLOAD_LIST = 'lists/DOWNLOAD_LIST'

// Action Creators
export function receiveLists (lists) {
  return {
    type: LISTS_RECEIVED,
    lists: lists
  }
}

export function fetchLists () {
  return {type: FETCH_LISTS}
}

export function downloadList (listID, filter = 'ALL') {
  return {
    type: DOWNLOAD_LIST,
    listID: listID,
    filter: filter
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
        lists: orderBy(action.lists, ['date'], ['desc']),
        error: ''
      }
    case LISTS_FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case LOGOUT:
      return initialState
    default: return state
  }
}
