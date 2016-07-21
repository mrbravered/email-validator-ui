import React, { PropTypes } from 'react'
import styles from './ResultStatsReference.scss'

class ResultStatsReference extends React.Component {
  static propTypes = {
    items: PropTypes.array
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

  render () {
    return (
      <table className={styles.StatsTable}>
        <tbody>
          {this.props.items.map((value) => this.statsTableRow(value))}
        </tbody>
      </table>
    )
  }
}

export default ResultStatsReference
