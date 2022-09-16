import React from 'react'
import PropTypes from 'prop-types'
import * as csvParser from 'parsers/csv'
import { createExcelAdditionalInfo } from 'parsers/excel'

const getFilenameExtension = (name) => name.split('.').pop()
const div = () => <div></div>

class FileSelectionInput extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    uploading: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.openUploadDialog = this.openUploadDialog.bind(this)
    this.onFileChange = this.onFileChange.bind(this)

    this.state = {
      AdditionalInfo: div,
      file: {
        name: ''
      },
      list: [],
      fileLoaded: false
    }
  }

  openUploadDialog () {
    this.refs.fileInput.click()
  }

  onFileChange (e) {
    if (e.target.files.length > 0) {
      this.setState({fileLoaded: true, AdditionalInfo: div})
      const file = e.target.files[0]
      this.setState({file: file})

      const ext = getFilenameExtension(file.name)

      if (ext === 'csv' || ext === 'txt') {
        csvParser.parse(file).then((results) => {
          this.props.onChange(results)
        })
      } else if (ext === 'xls' || ext === 'xlsx') {
        this.setState({AdditionalInfo: createExcelAdditionalInfo(file)})
      }
    }
  }

  render () {
    const { uploading } = this.props

    return (
      <div>
        <div className='input-group'>
          <input
            type='file'
            style={{display: 'none'}}
            ref='fileInput'
            onChange={this.onFileChange}
          />

          <input type='text' className='form-control' disabled value={this.state.file.name || ''} />
          <span className='input-group-btn'>
            <button
              type='button'
              className='btn btn-default'
              disabled={uploading}
              onClick={this.openUploadDialog}
            >
              <i className='fa fa-upload'></i> Select file
            </button>
          </span>

        </div>
        <this.state.AdditionalInfo onChange={this.props.onChange} untouch={this.props.untouch}/>
      </div>
    )
  }
}

export default FileSelectionInput
