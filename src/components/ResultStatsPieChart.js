import React from 'react'
import PropTypes from 'prop-types'
import PieChart from './PieChart'

class ResultStats extends React.Component {
  static propTypes = {
    items: PropTypes.array
  }

  render () {
    const data = this.props.items.filter((v) => !v.negligible).map((v) => ({
      value: v.count,
      color: v.color
    }))
    return (
      <PieChart size={200} data={data} />
    )
  }
}

export default ResultStats
