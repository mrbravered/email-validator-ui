import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { getLists, downloadList } from 'Api'
import * as duck from '../modules/Lists'

function * fetchLists (action) {
  try {
    const lists = yield call(getLists)
    yield put(duck.receiveLists(lists))
  } catch (error) {
    yield put({type: duck.LISTS_FETCH_FAILED, error: error.message})
  }
}

function * downloadListSaga (action) {
  try {
    yield call(downloadList, action.listID, action.filter)
  } catch (error) {
  }
}

export default function * listsSaga () {
  yield [
    takeLatest(duck.FETCH_LISTS, fetchLists),
    takeLatest(duck.DOWNLOAD_LIST, downloadListSaga)
  ]
}
