import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { register } from 'redux/modules/Auth'
import RegisterForm from 'forms/RegisterForm'

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
      return new Promise((resolve, reject) => {
        dispatch(register(values.email, values.password, resolve, reject))
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterView)
