import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserList } from 'redux/modules/User'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'
import UserTable from '../../components/UserTable'

export class Lists extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool
  }

  componentDidMount() {
    const { getUsers } = this.props
    getUsers()
  }

  render () {
    const { isFetching, users } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'>
            <HeaderWithRightSpinner title='User Management' loading={isFetching} />
            <UserTable users={users} />
          </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.lists.isFetching,
    users: state.user.users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: ()=> dispatch(getUserList()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)
