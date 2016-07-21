import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ResultsDownloadContainer from 'containers/ResultsDownloadContainer'
import ListViewHeader from 'components/ListViewHeader'
import ResultStatsReference from 'components/BulkValidation/ResultStatsReference'
import ResultStatsPieChart from 'components/ResultStatsPieChart'

import styles from './ResultsContainer.scss'

const reportKeys = {
  valid: {
    title: 'Valid',
    color: '#60BD68'
  },
  invalid: {
    title: 'Invalid',
    color: '#F15854'
  },
  unknown: {
    title: 'Unknown',
    color: '#4D4D4D'
  },
  spamtrap: {
    title: 'Spam Trap',
    color: '#FAA43A'
  },
  'role-based': {
    title: 'Role Based',
    color: '#F17CB0'
  },
  'accept all': {
    title: 'Accept All',
    color: '#B276B2'
  }
}

export class ResultsContainer extends React.Component {
  static propTypes = {
    list: PropTypes.object,
    isFetching: PropTypes.bool,
    id: PropTypes.string
  }

  render () {
    const {list, isFetching, id} = this.props

    if (list) {
      // Put report in order
      const report = list.report
      const reportItems = Object.keys(reportKeys).map((key) => ({
        key,
        title: reportKeys[key].title,
        count: report[key],
        percent: (report[key] / report.total * 100),
        negligible: (report[key] / report.total * 100) < 1,
        color: reportKeys[key].color
      }))
      return (
        <div>
          <ListViewHeader list={list} loading={isFetching} />
          <div className={styles.wrapper}>
            <div className={styles.reference}>
              <ResultStatsReference items={reportItems} />
            </div>
            <div className={styles.piechart}>
              <div className={styles.piechartInner}>
                <ResultStatsPieChart items={reportItems} />
              </div>
            </div>
            <div className={styles.downloadbuttons}>
              <div className={styles.downloadbuttonsInner}>
                <ResultsDownloadContainer id={list.id} />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <ListViewHeader list={list} loading={isFetching} />
          {isFetching ? <div>Loading</div> : <div>Not found</div>}
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
