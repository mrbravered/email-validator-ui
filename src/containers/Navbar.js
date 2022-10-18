import { connect } from 'react-redux'
import Navbar from 'components/Navbar'
import { logout } from 'redux/modules/Auth'

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
