import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ProgressBar from 'components/ProgressBar'

export const fields = ['name', 'file', 'textarea']

const validate = (values) => {
  const errors = {}

  const isTextareaFilled = values.textarea && values.textarea !== ''
  const isFileInputFilled = values.file && values.length !== 0

  if (!isTextareaFilled && !isFileInputFilled) {
    errors._error = 'You have to select a file or paste the list.'
  }

  return errors
}

const getName = (field) => {
  try {
    return field.value[0].name
  } catch (e) {
    return ''
  }
}

export class NewList extends React.Component {

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
    this.openUploadDialog = this.openUploadDialog.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }

  openUploadDialog () {
    this.refs.fileInput.click()
  }

  onFileChange (e) {
    if (this.props.fields.name.value === '' || !this.props.fields.name.touched) {
      this.props.fields.name.onChange(e.target.files[0].name)
    }
    this.props.fields.file.onChange(e)
  }

  render () {
    const { fields, handleSubmit, uploading, uploadProgress, error, submitFailed } = this.props

    return (
      <form onSubmit={handleSubmit}>

        <div className='row'>
          <div className='col-sm-12'>
            <div className='form-group'>
              <label>List name</label>
              <input type='text' className='form-control' {...fields.name} />
            </div>
          </div>
        </div>

        <div className='row' style={{marginTop: '1em', marginBottom: '1em'}}>

          <div className='col-md-6'>
            <div className='form-group'>
              <label>Upload a file</label>
              <div className='input-group'>
                <input type='text' className='form-control' disabled='true' value={getName(fields.file)} />
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
              <div className='help-text' style={{marginTop: '1em'}}>
              It should be a text file with one email address per line.
              </div>
              <input
                type='file'
                style={{display: 'none'}}
                ref='fileInput'
                {...fields.file}
                onChange={this.onFileChange}
                value={null}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
              <label>or paste the list</label>
              <textarea
                disabled={uploading}
                rows={4}
                className='form-control'
                {...fields.textarea}
                style={{}}
              ></textarea>
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
              >Validate</button>
            </div>
          </div>
        </div>

      </form>
    )
  }
}

const NewListForm = reduxForm({
  form: 'NewList',
  fields,
  validate
})(NewList)

export default NewListForm
