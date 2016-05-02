import { takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { getLists } from 'Api'
import download from 'downloadjs'
import * as duck from '../modules/Lists'

function getValidAddresses (state, listID) {
  const list = state.lists.lists.filter((l) => l.id === listID)[0]
  return list.posts.filter((r) => r.status === 'valid').map((r) => r.emailAddress)
}

function getAllResults (state, listID) {
  const list = state.lists.lists.filter((l) => l.id === listID)[0]
  let content = 'emailAddress,status\n'
  list.posts.map((r) => { content += `${r.emailAddress},${r.status}\n` })
  return content
}

function * fetchLists (action) {
  try {
    const lists = yield call(getLists)
    yield put(duck.receiveLists(lists))
  } catch (error) {
    yield put({type: duck.LISTS_FETCH_FAILED, error: error.message})
  }
}

function * downloadListValidAddresses (action) {
  const emails = yield select(getValidAddresses, action.listID)
  download(emails.join('\n'), 'validEmails.csv', 'text/csv')
}

function * downloadListAllResults (action) {
  const results = yield select(getAllResults, action.listID)
  download(results, 'emailValidationResult.csv', 'text/csv')
}

export default function * listsSaga () {
  yield [
    takeLatest(duck.FETCH_LISTS, fetchLists),
    takeLatest(duck.DOWNLOAD_LIST_VALID, downloadListValidAddresses),
    takeLatest(duck.DOWNLOAD_LIST_ALL_RESULTS, downloadListAllResults)
  ]
}
