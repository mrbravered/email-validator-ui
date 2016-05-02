import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ResultsDownloadContainer from 'containers/ResultsDownloadContainer'
import ResultStats from 'components/BulkValidation/ResultStats'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'

export class ResultsContainer extends React.Component {
  static propTypes = {
    list: PropTypes.object,
    isFetching: PropTypes.bool,
    id: PropTypes.string
  }

  render () {
    const {list, isFetching, id} = this.props
    if (list) {
      return (
        <div>
          <HeaderWithRightSpinner title={id} loading={isFetching} />
          <ResultStats report={list.report} />
          <ResultsDownloadContainer id={list.id} />
        </div>
      )
    } else {
      return (
        <div>
          <HeaderWithRightSpinner title={id} loading={isFetching} />
          {isFetching ? <div>Cargando</div> : <div>Not found</div>}
        </div>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.lists.filter((list) => list.id === ownProps.id)[0],
    isFetching: state.lists.isFetching
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)
