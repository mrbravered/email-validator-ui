import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from 'redux/modules/Auth'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'

export class LoginView extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.apiKey.value)
  }

  render () {
    const { loginFailed, isFetching } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title='Login' loading={isFetching} />
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <input type='text' className='form-control' placeholder='API Key' ref='apiKey'/>
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-primary' disabled={isFetching}>Login</button>
              </div>
            </form>
            {loginFailed ? <div className='alert alert-danger'>Invalid API Key.</div> : ''}
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
    onSubmit: (apiKey) => dispatch(login(apiKey))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView)
