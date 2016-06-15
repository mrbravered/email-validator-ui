/* eslint-env worker, es6 */
/* global XLSX */
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js')
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.core.min.js')

const ab2str = (data) => {
  let o = ''
  let l = 0
  let w = 10240
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}

const pattern = /([A-Za-z]+)(\d+)/
const parseCellId = (cellId) => {
  const values = pattern.exec(cellId)
  if (values) {
    return values.splice(1)
  } else {
    null
  }
}

let workbook

const handleSelectSheet = (data) => {
  let sheetName = data.sheet
  let worksheet = workbook.Sheets[sheetName]
  let columns = []
  for (let cell in worksheet) {
    let cellData = parseCellId(cell)
    if (cellData) {
      let column = cellData[0]
      if (column && columns.indexOf(column) === -1) {
        columns.push(column)
      }
    }
  }
  postMessage({
    type: 'SELECT_SHEET_SUCCESS',
    columns
  })
}

onmessage = (oEvent) => {
  switch (oEvent.data.type) {
    case 'READ_FILE':
      try {
        workbook = XLSX.read(ab2str(oEvent.data.data), {
          type: 'binary'
        })
        postMessage({
          type: 'READ_FILE_SUCCESS',
          sheetNames: workbook.SheetNames
        })
      } catch (e) {
        postMessage({
          type: 'READ_FILE_ERROR',
          error: e
        })
      }
      break

    case 'SELECT_SHEET':
      handleSelectSheet(oEvent.data.data)
      break

    case 'SELECT_COLUMN':
      let sheetName = oEvent.data.data.sheetName
      let column = oEvent.data.data.column
      let worksheet = workbook.Sheets[sheetName]
      let list = []
      for (let cell in worksheet) {
        if (cell[0] === column) {
          let value = worksheet[cell].v
          if (value.indexOf('@') !== -1) {
            list.push(value)
          }
        }
      }
      if (list.length > 0) {
        postMessage({
          type: 'SELECT_COLUMN_SUCCESS',
          list: list
        })
      } else {
        postMessage({
          type: 'SELECT_COLUMN_ERROR',
          error: 'The selected sheet and column doesn\'t appear to have any email addresses.'
        })
      }
  }
}
