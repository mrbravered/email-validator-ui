import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser, updateUser, updateUserPassword } from 'redux/modules/User'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'
import { UserUpdateForm, UserPasswordUpdateForm } from 'forms/UserForm'

export class UserDetailView extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool
  }

  componentDidMount() {
    const { getOneUser, params: {id} } = this.props
    getOneUser(id)
  }

  onSubmit (data) {
    const {updateOneUser, params: {id}} = this.props
    updateOneUser(id, data)
  }

  onResetPasswod (data) {
    const {updateUserPassword, params: {id}} = this.props
    updateUserPassword(id, data.password)
  }

  isResetPasswordPage () {
    return this.props.location.pathname.includes("reset-password")
  }

  render () {
    const { isFetching, user } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title={user.email} loading={isFetching} />
            { this.isResetPasswordPage() ?
                <UserPasswordUpdateForm user={user} onSubmit={this.onResetPasswod.bind(this)}/>
              :
                <UserUpdateForm user={user} onSubmit={this.onSubmit.bind(this)}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.lists.isFetching,
    user: state.user.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getOneUser: (id)=> dispatch(getUser(id)),
    updateOneUser: (id, data) => dispatch(updateUser(id, data)),
    updateUserPassword: (id, password) => dispatch(updateUserPassword(id, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailView)
