import React, { PropTypes } from 'react'

const sin = Math.sin
const cos = Math.cos
const PI = Math.PI

function pointForAngle (r, angle) {
  return {
    x: r * (1 + sin(angle)),
    y: r * (1 - cos(angle))
  }
}

class PieSlice extends React.Component {

  static propTypes = {
    r: PropTypes.number,
    color: PropTypes.string,
    largeArc: PropTypes.number,
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }))
  }

  render () {
    const { r, points, color, largeArc } = this.props
    const d = `M ${r} ${r} L ${points[0].x} ${points[0].y} A ${r} ${r} 0 ${largeArc} 1 ${points[1].x} ${points[1].y} Z`
    return <path fill={color} stroke='white' strokeWidth={2} d={d} />
  }
}

class PieChart extends React.Component {

  static propTypes = {
    size: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      color: PropTypes.string
    }))
  }

  render () {
    const { size, data } = this.props
    const radius = 100
    let slices
    const total = data.map((v) => v.value).reduce((a, b) => a + b, 0)

    // Calculate decimals and add to slices
    slices = data.map((slice) => ({
      ...slice,
      dec: slice.value / total
    }))

    // Calculate angles and add to slices
    slices = slices.map((slice) => ({
      ...slice,
      angle: slice.dec * 2 * PI
    }))

    // Calculate accumulated angles and add to slices
    let accumulated = 0
    slices = slices.map((slice) => {
      accumulated += slice.angle
      return {
        ...slice,
        accumulatedAngle: accumulated
      }
    })

    // Calculate start and end points and add to slices
    slices = slices.map((slice, i, array) => ({
      ...slice,
      points: [
        i === 0 ? {x: radius, y: 0} : pointForAngle(radius, array[i - 1].accumulatedAngle),
        pointForAngle(radius, array[i].accumulatedAngle)
      ]
    }))

    return (
      <svg width={size} height={size} viewBox='0 0 200 200' preserveAspectRatio='none'>
        {slices.map((slice, i) => <PieSlice key={i} r={radius} color={slice.color} points={slice.points} largeArc={slice.angle > PI ? 1 : 0} />)}
        <circle cx={radius} cy={radius} r={radius * 0.65} fill='white' />
        <text
          textAnchor='middle'
          x={radius}
          y={radius + 2}
          fontSize={28}
          fontWeight={500}
        >
          {total}
        </text>
        <text
          textAnchor='middle'
          x={radius}
          y={radius + 22}
          fontSize={14}
          fontWeight={400}
        >
          Total
        </text>
      </svg>
    )
  }
}

export default PieChart
