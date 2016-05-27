import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from 'redux/modules/Auth'
import RegisterForm from 'forms/RegisterForm'
import { register } from 'Api'

export class RegisterView extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  render () {
    const { onSubmit } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>

            <RegisterForm onSubmit={onSubmit} />

          </div>
        </div>
      </div>
      )
  }
}

RegisterView.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      return register(values.email, values.password)
      .then(() => {
        dispatch(login(values.email, values.password, () => {}, () => {}))
      })
      .catch((e) => {
        return Promise.reject({_error: e.message})
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView)
