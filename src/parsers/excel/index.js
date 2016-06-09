import React, { PropTypes } from 'react'

const createAdditionalInfo = (wb) => {
  class AdditionalInfo extends React.Component {

    static propTypes = {
      onChange: PropTypes.func
    }

    constructor (props) {
      super(props)

      this.state = {
        wb: wb,
        sheet: wb.SheetNames.length === 1 ? wb.SheetNames[0] : null,
        error: null,
        selected: false,
        column: ''
      }
      this.onSelect = this.onSelect.bind(this)
    }

    onSelect () {
      const sheetName = this.refs.sheetSelect.value
      const col = this.refs.colInput.value

      const worksheet = wb.Sheets[sheetName]
      const list = []
      for (let cell in worksheet) {
        if (cell[0] === col) {
          let value = worksheet[cell].v
          if (value.indexOf('@') !== -1) {
            list.push(value)
          }
        }
      }
      if (list.length > 0) {
        this.setState({error: null, column: col, selected: true})
        this.props.onChange(list)
      } else {
        this.setState({error: 'The selected sheet and column doesn\'t appear to have any email addresses.'})
      }
    }

    render () {
      let content
      if (!this.state.selected) {
        content = (
          <div style={{marginTop: '1em'}}>
            <div className='help-text'>
              Select the sheet and column containing the email addresses.
            </div>
            <div className='form-group'>
              <select defaultValue={wb.SheetNames[0]} ref='sheetSelect' className='form-control'>
                {wb.SheetNames.map((sheet) => <option value={sheet} key={sheet}>{sheet}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Column' ref='colInput' />
            </div>
            {this.state.error ? <div className='text-danger'>{this.state.error}</div> : ''}
            <div className='form-group'>
              <button type='button' className='btn btn-default' onClick={this.onSelect}>Select</button>
            </div>
          </div>
        )
      } else {
        content = <div style={{marginTop: '1em'}}>Selected sheet {this.state.sheet} and column {this.state.column}</div>
      }
      return content
    }
  }
  return AdditionalInfo
}

export const parse = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, {type: 'binary'})
    resolve({
      ready: false,
      list: null,
      AdditionalInfoComponent: createAdditionalInfo(workbook)
    })
  }
  reader.readAsBinaryString(file)
})
