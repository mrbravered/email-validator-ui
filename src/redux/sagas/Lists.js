import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { getLists, getListPosts } from 'Api'
import download from 'downloadjs'
import * as duck from '../modules/Lists'

function * fetchLists (action) {
  try {
    const lists = yield call(getLists)
    yield put(duck.receiveLists(lists))
  } catch (error) {
    yield put({type: duck.LISTS_FETCH_FAILED, error: error.message})
  }
}

function * downloadListValidAddresses (action) {
  const list = yield call(getListPosts, action.listID)
  const emails = list.posts.filter((r) => r.status === 'valid').map((r) => r.emailAddress)
  download(emails.join('\n'), 'validEmails.csv', 'text/csv')
}

function * downloadListAllResults (action) {
  const list = yield call(getListPosts, action.listID)
  let content = 'emailAddress,status\n'
  list.posts.map((r) => { content += `${r.emailAddress},${r.status}\n` })
  download(content, 'emailValidationResult.csv', 'text/csv')
}

export default function * listsSaga () {
  yield [
    takeLatest(duck.FETCH_LISTS, fetchLists),
    takeLatest(duck.DOWNLOAD_LIST_VALID, downloadListValidAddresses),
    takeLatest(duck.DOWNLOAD_LIST_ALL_RESULTS, downloadListAllResults)
  ]
}
