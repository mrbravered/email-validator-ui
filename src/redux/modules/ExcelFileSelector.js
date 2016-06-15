// Constants
export const READ_FILE = 'excel-file-selector/READ_FILE'
export const READ_FILE_SUCCESS = 'excel-file-selector/READ_FILE_SUCCESS'
export const READ_FILE_ERROR = 'excel-file-selector/READ_FILE_ERROR'

export const SELECT_SHEET = 'excel-file-selector/SELECT_SHEET'
export const SELECT_SHEET_SUCCESS = 'excel-file-selector/SELECT_SHEET_SUCCESS'

export const SELECT_COLUMN = 'excel-file-selector/SELECT_COLUMN'
export const SELECT_COLUMN_SUCCESS = 'excel-file-selector/SELECT_COLUMN_SUCCESS'
export const SELECT_COLUMN_ERROR = 'excel-file-selector/SELECT_COLUMN_ERROR'

export const RESET = 'excel-file-selector/RESET'

// Action Creators
export const readExcelFile = (file) => {
  return {
    type: READ_FILE,
    file
  }
}

export const selectSheet = (sheet) => {
  return {
    type: SELECT_SHEET,
    sheet
  }
}

export const selectColumn = (column) => {
  return {
    type: SELECT_COLUMN,
    column
  }
}

export const reset = () => {
  return {
    type: RESET
  }
}

// Reducer
export const initialState = {
  list: [],
  sheet: null,
  column: null,
  sheetNames: [],
  columns: [],
  error: null,
  loading: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState
    case READ_FILE:
      return {
        ...state,
        loading: true,
        error: null
      }
    case READ_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sheetNames: action.sheetNames,
        sheet: action.sheetNames[0]
      }
    case READ_FILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.message
      }
    case SELECT_SHEET:
      return {
        ...state,
        loading: true,
        error: false,
        sheet: action.sheet,
        columns: initialState.columns,
        column: initialState.column
      }
    case SELECT_SHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        columns: action.columns
      }
    case SELECT_COLUMN:
      return {
        ...state,
        loading: true,
        error: false,
        column: action.column
      }
    case SELECT_COLUMN_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.list
      }
    case SELECT_COLUMN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.message
      }
    default:
      return state
  }
}
