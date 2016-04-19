import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from 'redux/modules/Auth'

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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref='apiKey'/>
          <button type='submit'>Login</button>
        </form>
      </div>
      )
  }
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired
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
