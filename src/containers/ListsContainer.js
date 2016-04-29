import { connect } from 'react-redux'

import { downloadListAllResults } from 'redux/modules/Lists'
import Lists from 'components/Lists'

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDownloadClick: (id) => dispatch(downloadListAllResults(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)
