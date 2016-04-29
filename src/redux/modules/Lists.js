import { getLists } from 'Api'
import download from 'downloadjs'

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

export function downloadListValidAddresses (listID) {
  return function (dispatch, getState) {
    const list = getState().lists.lists.filter((l) => l.id === listID)[0]
    const emails = list.posts.filter((r) => r.status === 'valid').map((r) => r.emailAddress).join('\n')
    download(emails, 'validEmails.txt', 'text/plain')
  }
}

export function downloadListAllResults (listID) {
  return function (dispatch, getState) {
    const list = getState().lists.lists.filter((l) => l.id === listID)[0]
    let content = 'emailAddress,status\n'
    list.posts.map((r) => { content += `${r.emailAddress},${r.status}\n` })
    download(content, 'emailValidationResult.csv', 'text/csv')
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
