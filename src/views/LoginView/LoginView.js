import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from 'redux/modules/Auth'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'
import LoginForm from 'forms/LoginForm'

export class LoginView extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  render () {
    const { isFetching, onSubmit } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title='Login' loading={isFetching} />

            <LoginForm onSubmit={onSubmit} />

          </div>
        </div>
      </div>
      )
  }
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loginFailed: PropTypes.bool,
  isFetching: PropTypes.bool
}

const mapStateToProps = (state) => {
  return state.auth
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (values) => {
      return new Promise((resolve, reject) => {
        dispatch(login(values.email, values.password, resolve, reject))
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView)
