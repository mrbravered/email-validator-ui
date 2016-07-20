import React, { PropTypes } from 'react'
import styles from './ResultStats.scss'

class ResultStats extends React.Component {
  static propTypes = {
    report: PropTypes.object
  }

  reportKeys = {
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

  constructor (props) {
    super(props)
    this.statsTableRow = this.statsTableRow.bind(this)

    // Put report in order
    const { report } = this.props
    this.values = Object.keys(this.reportKeys).map((key) => ({
      key,
      title: this.reportKeys[key].title,
      count: report[key],
      percent: (report[key] / report.total * 100),
      negligible: (report[key] / report.total * 100) < 1,
      color: this.reportKeys[key].color
    }))
  }

  statsTableRow (value) {
    let trClassName
    let countContent
    if (value.negligible) {
      trClassName = styles.negligible
      countContent = value.count
    } else {
      trClassName = ''
      countContent = (
        <span
          className='label'
          style={{backgroundColor: value.color}}
        >
          {value.count}
        </span>
      )
    }
    return (
      <tr key={value.key} className={trClassName}>
        <td className={styles.absorbing}>{value.title}</td>
        <td className={styles.fitting}>
          {countContent}
        </td>
        <td className={styles.fitting}>{value.percent.toFixed(2)} %</td>
      </tr>
    )
  }

  get statsTable () {
    return (
      <table className={styles.StatsTable}>
        <tbody>
          {this.values.map((value) => this.statsTableRow(value))}
        </tbody>
      </table>
    )
  }

  render () {
    const { report } = this.props

    const validWidth = report.valid / report.total * 100
    const invalidWidth = report.invalid / report.total * 100
    const unknownWidth = report.unknown / report.total * 100
    const spamTrapWidth = report.spamtrap / report.total * 100
    const roleBasedWidth = report['role-based'] / report.total * 100
    const acceptAllWidth = report['accept all'] / report.total * 100

    return (
      <div>
        <div>
          {this.statsTable}
        </div>
        <div className='progress'>
          <div className='progress-bar progress-bar-success' style={{width: validWidth + '%'}}></div>
          <div className='progress-bar progress-bar-info' style={{width: unknownWidth + '%'}}></div>
          <div className='progress-bar progress-bar-warning' style={{width: spamTrapWidth + '%'}}></div>
          <div className='progress-bar progress-bar-warning' style={{width: roleBasedWidth + '%'}}></div>
          <div className='progress-bar progress-bar-warning' style={{width: acceptAllWidth + '%'}}></div>
          <div className='progress-bar progress-bar-danger' style={{width: invalidWidth + '%'}}></div>
        </div>
      </div>
    )
  }
}

export default ResultStats
