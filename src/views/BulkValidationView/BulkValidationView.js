import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'
import { validate } from 'redux/modules/BulkValidation'
import readList from 'utils/listReader'
import ProgressBar from 'components/ProgressBar'

export class BulkValidation extends React.Component {

  noResultsMessage = 'Enter a list of email addresses and click Validate to see the results of the validation.'

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openUploadDialog = this.openUploadDialog.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.state = {
      filename: ''
    }
  }

  openUploadDialog () {
    this.refs.fileInput.click()
  }

  handleFileSelect (e) {
    this.setState({filename: e.target.files[0].name})
  }

  handleSubmit (e) {
    e.preventDefault()

    // Build email addresses list, a merge between the content
    // of the file and the content of the textarea
    const textareaValue = this.refs.textarea.value

    let fileValue = ''
    if (this.refs.fileInput.files.length > 0) {
      fileValue = readList(this.refs.fileInput.files[0])
    }

    Promise.all([textareaValue, fileValue]).then((values) => {
      const text = values.join('\n')
      const trimmed = text.trim()
      const emailsArray = compact(unique(trimmed.split('\n')))
      this.props.onSubmit(emailsArray)
    })
  }

  render () {
    const { uploading, error, uploadProgress } = this.props
    const { filename } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <h1>Bulk email validation</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <div className='input-group'>
                  <input type='text' className='form-control' disabled='true' value={filename} />
                  <span className='input-group-btn'>
                    <button
                      type='button'
                      className='btn btn-default'
                      disabled={uploading}
                      onClick={this.openUploadDialog}
                    >
                      <i className='fa fa-upload'></i> Upload list of e-mail addresses
                    </button>
                  </span>
                </div>
                <input type='file' style={{display: 'none'}} ref='fileInput' onChange={this.handleFileSelect} />
              </div>
              <div className='form-group'>
                <textarea
                  disabled={uploading}
                  rows={6}
                  className='form-control'
                  ref='textarea'
                ></textarea>
              </div>

              {uploading ? <ProgressBar {...uploadProgress} /> : ''}

              <div className='form-group'>
                <button
                  // disabled={this.refs.fileInput.files.length === 0 || this.refs.textarea.value.length === 0}
                  type='submit'
                  className='btn btn-primary btn-block'
                >Validate</button>
              </div>
            </form>
            {error ? <div className='alert alert-danger'>Error: {error}</div> : ''}
          </div>
        </div>
      </div>
    )
  }
}

BulkValidation.propTypes = {
  error: PropTypes.string,
  uploading: PropTypes.bool,
  onSubmit: PropTypes.func,
  uploadProgress: PropTypes.object
}

const mapStateToProps = (state) => {
  return state.bulkValidation
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (emailsList) => dispatch(validate(emailsList))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkValidation)
