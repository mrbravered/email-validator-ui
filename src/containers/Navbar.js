import { connect } from 'react-redux'
import Navbar from 'components/Navbar'
import { logout } from 'redux/modules/Auth'

const mapStateToProps = (state) => {
  return {
    auth: state.auth
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
