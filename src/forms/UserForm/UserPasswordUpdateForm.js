import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

export const fields = ['password']

const validate = (values) => {
  const errors = {}
  const isPasswordFilled = values.password && values.password !== '' 
  if (!isPasswordFilled) {
    errors._error = 'Please Input Password.'
  }
  if(values.password) {
    const isPasswordValidate = values.password.length >= 8
    if(!isPasswordValidate) {
      errors._error = 'The Password Length should bigger than 8.'
    }
  }
  return errors
}

export class UserPasswordUpdateForm extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.object,
    uploading: PropTypes.bool,
    uploadProgress: PropTypes.object,
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
    user: PropTypes.object,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { user, fields, handleSubmit, error, values } = this.props

    return (
      <form onSubmit={handleSubmit}>

        <div className='row'>
          <div className='col-sm-12'>
            <div className='form-group d-flex'>
              <label htmlFor='reqeustLimit'>Password</label>
              <input type='text' className='form-control' {...fields.password} />
            </div>
          </div>

          <div className='col-sm-12'>
            {error ? <div className='text-danger'>{error}</div> : ''}
            <button type='submit' className='btn btn-primary'>Reset Password</button>
            <a type='button' className='btn btn-info' href={`/app/users/${user.id}`}>Cancel</a>  
          </div>
        </div>
      </form>
    )
  }
}

export default compose(
  connect(),
  reduxForm(
    {
      form: 'UserPasswordUpdateForm',
      enableReinitialize: true,
      fields,
      validate
    }
  )
)(UserPasswordUpdateForm)
