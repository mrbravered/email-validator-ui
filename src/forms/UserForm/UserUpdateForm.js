import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Select from 'react-select'

export const fields = ['requestLimit', 'expandLimit', 'allowedPremiumStatuses']

const validate = (values) => {
  const errors = {}
  const isRequestLimitValidated = values.requestLimit && (values.requestLimit > 0 || values.requestLimit === -1)
  const isExpandLimitValidated = values.expandLimit && (values.expandLimit > 0 || values.expandLimit === -1)
  if (!isRequestLimitValidated || !isExpandLimitValidated) {
    errors._error = 'Input correct values. The input value should bigger than 0 or equals -1.'
  }
  return errors
}

class UserUpdate extends React.Component {

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
    const { user, fields, handleSubmit, error } = this.props

    return (
      <form onSubmit={handleSubmit}>

        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group d-flex'>
              <label htmlFor='reqeustLimit'>Request Limit</label>
              <input type='number' className='form-control' {...fields.requestLimit} />
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='form-group d-flex'>
              <label htmlFor='expandLimit'>Expend Limit</label>
              <input type='number' className='form-control' {...fields.expandLimit} />
            </div>
          </div>

          <div className='col-sm-12'>
            <div className='form-group d-flex'>
              <label htmlFor='expandLimit'>Premium Status</label>
              <Select 
                {...fields.allowedPremiumStatuses}
                value={fields.allowedPremiumStatuses.value}
                onChange={fields.allowedPremiumStatuses.onChange}
                onBlur={fields.allowedPremiumStatuses.onBlur.onBlur}
                options={[
                  {'label': 'spamtrap', 'value': 'spamtrap'},
                  {'label': 'complainer', 'value': 'complainer'},
                ]}
                isMulti
              />
            </div>
          </div>

          <div className='col-sm-12'>
            {error ? <div className='text-danger'>{error}</div> : ''}
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary'
              >Update User</button>
              <a type='button' className='btn btn-primary' href={`${user.id}/reset-password`}>Reset Password</a>
              <a type='button' className='btn btn-info' href={`/app/users`}>Cancel</a>  
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default compose(
  connect((state) => {
    return {
      user: state.user.user,
      initialValues: {
        ...state.user.user,
        allowedPremiumStatuses: state.user.user.allowedPremiumStatuses && state.user.user.allowedPremiumStatuses.map((status)=>{
          return {'value': status, 'label': status}
        })
      },
    }
  }),
  reduxForm(
    {
      form: 'UserUpdateForm',
      enableReinitialize: true,
      fields,
      validate
    }
  )
)(UserUpdate)
