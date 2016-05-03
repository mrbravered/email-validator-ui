import { connect } from 'react-redux'

import { downloadList } from 'redux/modules/Lists'
import Lists from 'components/Lists'

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDownloadClick: (id) => dispatch(downloadList(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)
