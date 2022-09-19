import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import ProgressBar from 'components/ProgressBar'
import FileSelectionInput from 'components/FileSelectionInput'

export const fields = ['name', 'file', 'textarea']

const validate = (values) => {
  const errors = {}

  const isTextareaFilled = values.textarea && values.textarea !== ''
  const isFileInputFilled = values.file && values.file.length > 0

  if (!isTextareaFilled && !isFileInputFilled) {
    errors._error = 'You have to either select a valid file or paste the list.'
  }
  return errors
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
    this.onTextareaChange = this.onTextareaChange.bind(this)
  }

  onTextareaChange (e) {
    this.props.fields.textarea.onChange(e.target.value.split('\n'))
  }

  render () {
    const { fields, handleSubmit, uploading, uploadProgress, error, submitFailed } = this.props

    return (
      <form onSubmit={handleSubmit}>

        <div className='row'>
          <div className='col-sm-12'>
            <div className='form-group'>
              <label htmlFor='name'>List name</label>
              <input type='text' className='form-control' {...fields.name} />
            </div>
          </div>
        </div>

        <div className='row' style={{marginTop: '1em', marginBottom: '1em'}}>

          <div className='col-md-6'>
            <div className='form-group'>
              <label>Upload a file</label>
              <div className='help-text' style={{marginBottom: '1em'}}>
                You can upload .csv, .xls or .xlsx files.
              </div>
              <FileSelectionInput {...fields.file} uploading={uploading} untouch={() => this.props.untouch(['file'])}/>
              {fields.file.error && <div className='text-danger'>{fields.file.error}</div>}
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
