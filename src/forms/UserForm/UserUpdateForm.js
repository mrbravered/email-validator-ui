import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

export const fields = ['requestLimit', 'expandLimit']

const validate = (values) => {
  const errors = {}

  // const isTextareaFilled = values.textarea && values.textarea !== ''

  // if (!isTextareaFilled && !isFileInpxutFilled) {
    // errors._error = 'You have to either select a valid file or paste the list.'
  // }
  return errors
}
export class UserUpdate extends React.Component {

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
              <div>None</div>
            </div>
          </div>

          <div className='col-sm-12'>
            {error ? <div className='text-danger'>{error}</div> : ''}
            <div className='form-group'>
              <button
                type='submit'
                className='btn btn-primary'
              >Update</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user.user
//   }
// }

export default compose(
  connect((state) => {
    return {
      user: state.user.user,
      initialValues: state.user.user,
    }
  }),
  reduxForm(
    {
      form: 'UserUpdate',
      enableReinitialize: true,
      fields,
      validate
    }
  )
)(UserUpdate)
// export default UserUpdateForm = connect(select, actions)(reduxForm({
//   form: 'UserUpdate',
//   enableReinitialize : true,
//   fields,
//   validate,
// }))(UserUpdate)
