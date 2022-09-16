import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ProgressBar from 'components/ProgressBar'
import FileSelectionInput from 'components/FileSelectionInput'

export const fields = ['file']

const validate = (values) => {
  const errors = {}

  const isFileInputFilled = values.file && values.file.length > 0

  return errors
}

export class EmailUpload extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    uploading: PropTypes.bool,
    uploadProgress: PropTypes.object,
    error: PropTypes.string,
    submitFailed: PropTypes.bool
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { fields, handleSubmit, uploading, uploadProgress, error, submitFailed } = this.props

    return (
      <form onSubmit={handleSubmit}>

        <div className='row' style={{marginTop: '1em', marginBottom: '1em'}}>

          <div className='col-md-12'>
            <div className='form-group'>
              <label>Upload a file</label>
              <div className='help-text' style={{marginBottom: '1em'}}>
                You can upload .csv, .xls or .xlsx files.
              </div>
              <FileSelectionInput {...fields.file} uploading={uploading} untouch={() => this.props.untouch(['file'])}/>
              {fields.file.error && <div className='text-danger'>{fields.file.error}</div>}
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-12'>
            {uploading ? <ProgressBar {...uploadProgress} /> : ''}

            {submitFailed && error ? <div className='text-danger'>{error}</div> : ''}

            <div className='form-group'>
              <button
                disabled={uploading}
                type='submit'
                className='btn btn-primary btn-lg'
              >Upload</button>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

const EmailUploadForm = reduxForm({
  form: 'EmailUpload',
  fields,
  validate
})(EmailUpload)

export default EmailUploadForm
