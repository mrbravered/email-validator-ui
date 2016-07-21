import { connect } from 'react-redux'
import ResultsDownload from 'components/ResultsDownload'
import { downloadList } from 'redux/modules/Lists'

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    id: ownProps.id,
    handleAllResultsDownload: () => dispatch(downloadList(ownProps.id, 'ALL')),
    handleValidEmailsDownload: () => dispatch(downloadList(ownProps.id, 'VALID'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsDownload)
