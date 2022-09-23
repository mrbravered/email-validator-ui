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
    const { getUsers, getFetchedLists } = this.props
    getFetchedLists()
    getUsers()
  }

  handleUserSelectChange(id, dateFilterType) {
    const { getFetchedLists } = this.props
    getFetchedLists(id, dateFilterType)
  }

  render () {
    const { isFetching, listCount, users } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title='Validation Lists' loading={isFetching}>
              <Link to='/app/lists/new' className='btn btn-primary'>
                <i className='fa fa-plus'></i> New list
              </Link>
            </HeaderWithRightSpinner>
            <ListInfoPanel listCount={listCount} users={users} handleUserSelectChange={(id, dateFilterType) => this.handleUserSelectChange(id, dateFilterType)}/>
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
    users: state.user.users
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
