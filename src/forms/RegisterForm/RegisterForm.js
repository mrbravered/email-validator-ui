import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import classNames from 'classnames'
import * as val from 'utils/validation'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'

export const fields = ['email', 'password']

const validate = val.createValidator({
  email: [val.required, val.email],
  password: [val.required, val.minLength(8)]
})

export class Register extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    error: PropTypes.string
  }

  render () {
    const { fields: {email, password}, handleSubmit, isSubmitting, error } = this.props

    return (
      <div>
        <HeaderWithRightSpinner title='Register' loading={isSubmitting} />
        <form onSubmit={handleSubmit}>

          <div className={classNames('form-group', {'has-error': email.touched && email.error})}>
            <label>Email address</label>
            <input type='email' className='form-control' disabled={isSubmitting} {...email} />
            {email.touched && email.error && <span className='help-block'>{email.error}</span>}
          </div>

          <div className={classNames('form-group', {'has-error': password.touched && password.error})}>
            <label>Password</label>
            <input type='password' className='form-control' disabled={isSubmitting} {...password} />
            {password.touched && password.error && <span className='help-block'>{password.error}</span>}
          </div>

          {error && <div className='alert alert-danger'>{error}</div>}

          <div className='form-group'>
            <button type='submit' className='btn btn-primary' disabled={isSubmitting}>Register</button>
          </div>

        </form>
      </div>
    )
  }
}

const RegisterForm = reduxForm({
  form: 'Register',
  fields,
  validate
})(Register)

export default RegisterForm
