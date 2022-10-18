import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getUserList } from 'redux/modules/User'
import { fetchLists } from 'redux/modules/Lists'
import ListsContainer from 'containers/ListsContainer'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'
import ListInfoPanel from '../../components/ListInfoPanel'

export class Lists extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool
  }

  componentDidMount() {
    const { getUsers, getFetchedLists, currentUser } = this.props
    if(currentUser.role !== 'Admin') {
      getFetchedLists(currentUser.id)
    } else {
      getFetchedLists()
      getUsers()
    }
  }

  handleUserSelectChange(id, dateFilterType) {
    const { getFetchedLists, currentUser } = this.props
    getFetchedLists(currentUser.role !== 'Admin' ? currentUser.id :id, dateFilterType)
  }

  render () {
    const { isFetching, listCount, users, currentUser } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title='Validation Lists' loading={isFetching}>
              <Link to='/app/lists/new' className='btn btn-primary'>
                <i className='fa fa-plus'></i> New list
              </Link>
            </HeaderWithRightSpinner>
            <ListInfoPanel listCount={listCount} users={users} currentUser={currentUser} handleUserSelectChange={(id, dateFilterType) => this.handleUserSelectChange(id, dateFilterType)}/>
            <ListsContainer />
          </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.lists.isFetching,
    listCount: state.lists.listCount,
    users: state.user.users,
    currentUser: state.auth.currentUser,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: ()=> dispatch(getUserList()),
    getFetchedLists: (userId = '', dateFilterType = '') => dispatch(fetchLists(userId, dateFilterType)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)
