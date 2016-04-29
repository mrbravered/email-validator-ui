import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ResultsDownload from 'components/BulkValidation/ResultsDownload'
import {downloadListValidAddresses, downloadListAllResults} from 'redux/modules/Lists'

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    id: ownProps.id,
    handleAllResultsDownload: () => dispatch(downloadListAllResults(ownProps.id)),
    handleValidEmailsDownload: () => dispatch(downloadListValidAddresses(ownProps.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsDownload)
