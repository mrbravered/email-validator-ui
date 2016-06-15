import { takeLatest, eventChannel } from 'redux-saga'
import { put, take, call, select } from 'redux-saga/effects'

import * as duck from 'redux/modules/ExcelFileSelector'

const XLSXWorker = require('worker!utils/xlsx-worker.js')

const excelWorker = new XLSXWorker()

const excelChannel = eventChannel((emmiter) => {
  excelWorker.onmessage = (e) => {
    switch (e.data.type) {
      case 'READ_FILE_SUCCESS':
        emmiter({
          type: duck.READ_FILE_SUCCESS,
          sheetNames: e.data.sheetNames
        })
        break
      case 'READ_FILE_ERROR':
        emmiter({
          type: duck.READ_FILE_ERROR,
          error: e.data.error
        })
        break
      case 'SELECT_SHEET_SUCCESS':
        emmiter({
          type: duck.SELECT_SHEET_SUCCESS,
          columns: e.data.columns
        })
        break
      case 'SELECT_COLUMN_SUCCESS':
        emmiter({
          type: duck.SELECT_COLUMN_SUCCESS,
          list: e.data.list
        })
        break
      case 'SELECT_COLUMN_ERROR':
        emmiter({
          type: duck.SELECT_COLUMN_ERROR,
          error: e.data.error
        })
        break
    }
  }

  return () => excelWorker.terminate()
})

const readBinary = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    resolve(e.target.result)
  }
  reader.readAsArrayBuffer(file)
})

function * readFile (action) {
  const ab = yield call(readBinary, action.file)
  excelWorker.postMessage({
    type: 'READ_FILE',
    data: ab
  })
  const result = yield take(excelChannel)
  yield put(result)
  if (result.type === duck.READ_FILE_SUCCESS && result.sheetNames.length > 0) {
    yield put(duck.selectSheet(result.sheetNames[0]))
  }
}

function * selectSheet (action) {
  excelWorker.postMessage({
    type: 'SELECT_SHEET',
    data: {
      sheet: action.sheet
    }
  })
  const result = yield take(excelChannel)
  yield put(result)
  if (result.columns.length > 0) {
    yield put(duck.selectColumn(result.columns[0]))
  }
}

function * selectColumn (action) {
  const sheet = yield select((state) => state.excelFileSelector.sheet)
  excelWorker.postMessage({
    type: 'SELECT_COLUMN',
    data: {
      sheetName: sheet,
      column: action.column
    }
  })
  const result = yield take(excelChannel)
  yield put(result)
}

export default function * () {
  yield [
    takeLatest(duck.READ_FILE, readFile),
    takeLatest(duck.SELECT_SHEET, selectSheet),
    takeLatest(duck.SELECT_COLUMN, selectColumn)
  ]
}
