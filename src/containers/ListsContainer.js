import { connect } from 'react-redux'

import Lists from 'components/Lists'

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)
