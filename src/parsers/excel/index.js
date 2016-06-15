import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as duck from 'redux/modules/ExcelFileSelector'
import isEqual from 'lodash/isEqual'

export const createExcelAdditionalInfo = (file) => {
  class AdditionalInfo extends React.Component {

    static propTypes = {
      onChange: PropTypes.func, // From FileSelectionInput
      readExcelFile: PropTypes.func, // From mapDispatchToProps
      selectSheet: PropTypes.func, // From mapDispatchToProps
      selectColumn: PropTypes.func, // From mapDispatchToProps
      reset: PropTypes.func, // From mapDispatchToProps
      state: PropTypes.object, // From mapStateToProps
      selected: PropTypes.bool // From mapStateToProps
    }

    constructor (props) {
      super(props)
      props.readExcelFile(file)
      this.onSheetSelect = this.onSheetSelect.bind(this)
      this.onColumnSelect = this.onColumnSelect.bind(this)
    }

    componentWillMount () {
      this.props.untouch()
    }

    onSheetSelect (e) {
      this.props.selectSheet(e.target.value)
    }

    onColumnSelect (e) {
      this.props.selectColumn(e.target.value)
    }

    componentWillUnmount () {
      this.props.reset()
      this.props.onChange([])
      this.props.untouch()
    }

    componentWillReceiveProps (nextProps) {
      // Pretty important. This is the interface to the outside world
      if (nextProps.state.list.length > 0 && !isEqual(this.props.state.list, nextProps.state.list)) {
        this.props.onChange(nextProps.state.list)
      }
    }

    render () {
      const { state, selected } = this.props

      if (state.loading) {
        return (
          <div style={{marginTop: '1em', marginBottom: '1px'}}>
            <i className='fa fa-circle-o-notch fa-spin' aria-hidden='true'></i> Loading
          </div>
        )
      }

      let sheetSelect
      if (state.sheetNames.length > 0) {
        sheetSelect = (
          <div className='form-group'>
            <select defaultValue={state.sheet} className='form-control' onChange={this.onSheetSelect}>
              {state.sheetNames.map((sheet) => <option value={sheet} key={sheet}>{sheet}</option>)}
            </select>
          </div>
        )
      }

      let columnSelect
      if (state.columns.length > 0) {
        columnSelect = (
          <div className='form-group'>
            <select defaultValue={state.column} className='form-control' onChange={this.onColumnSelect}>
              {state.columns.map((column) => <option value={column} key={column}>{column}</option>)}
            </select>
          </div>
        )
      }

      return (
        <div style={{marginTop: '1em'}}>
          <div className='help-text'>
            Select the sheet and column containing the email addresses.
          </div>
          {sheetSelect}
          {columnSelect}
          {state.error ? <div className='text-danger'>{state.error}</div> : ''}
        </div>
      )

    }
  }
  const mapStateToProps = (state) => {
    return {
      state: state.excelFileSelector,
      selected: !!(state.excelFileSelector.sheet && state.excelFileSelector.column)
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      reset: () => dispatch(duck.reset()),
      readExcelFile: (file) => dispatch(duck.readExcelFile(file)),
      selectSheet: (sheet) => dispatch(duck.selectSheet(sheet)),
      selectColumn: (sheet, column) => dispatch(duck.selectColumn(sheet, column))
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdditionalInfo)
}
