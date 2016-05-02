// Constants
export const FETCH_LISTS = 'lists/FETCH_LISTS'
export const LISTS_RECEIVED = 'lists/LISTS_RECEIVED'
export const LISTS_FETCH_FAILED = 'lists/LISTS_FETCH_FAILED'
export const DOWNLOAD_LIST_VALID = 'lists/DOWNLOAD_LIST_VALID'
export const DOWNLOAD_LIST_ALL_RESULTS = 'lists/DOWNLOAD_LIST_ALL_RESULTS'

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

export function downloadListValidAddresses (listID) {
  return {
    type: DOWNLOAD_LIST_VALID,
    listID: listID
  }
}

export function downloadListAllResults (listID) {
  return {
    type: DOWNLOAD_LIST_ALL_RESULTS,
    listID: listID
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
