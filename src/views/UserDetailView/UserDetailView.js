import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser, updateUser } from 'redux/modules/User'
import { validate } from 'redux/modules/BulkValidation'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'
import UserForm from 'forms/UserForm'

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

  render () {
    const { isFetching, user } = this.props
    console.log(user)
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title={user.email} loading={isFetching} />
            <UserForm user={user} onSubmit={this.onSubmit.bind(this)}/>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailView)
