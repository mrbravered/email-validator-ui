import React, { PropTypes } from 'react'
import PieChart from './PieChart'

class ResultStats extends React.Component {
  static propTypes = {
    items: PropTypes.array
  }

  render () {
    const data = this.props.items.map((v) => ({
      value: v.count,
      color: v.color
    })).filter((v) => v.value > 0)
    return (
      <PieChart size={200} data={data} />
    )
  }
}

export default ResultStats
