import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ResultsDownload from 'components/BulkValidation/ResultsDownload'
import ResultsTable from 'components/BulkValidation/ResultsTable'
import ResultStats from 'components/BulkValidation/ResultStats'

export class ResultsContainer extends React.Component {
  static propTypes = {
    list: PropTypes.object
  }

  render () {
    const {list} = this.props

    return (
      <div>
        <ResultsDownload posts={list.posts} />
        <ResultStats report={list.report} />
        <ResultsTable posts={list.posts} />
      </div>
      )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.lists.filter((list) => list.id === ownProps.id)[0]
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)
