import React, { PropTypes } from 'react'

const ResultStats = ({validCount, invalidCount}) => {
  const wrapperStyle = {
    width: '100%',
    display: 'flex'
  }

  const partialBarStyle = {
    height: '5px'
  }

  const validBarStyle = Object.assign({}, partialBarStyle, {
    flex: validCount,
    backgroundColor: 'green'
  })

  const invalidBarStyle = Object.assign({}, partialBarStyle, {
    flex: invalidCount,
    backgroundColor: 'red'
  })

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '2em'}}>
        <div>{validCount}</div>
        <div>{invalidCount}</div>
      </div>
      <div style={wrapperStyle}>
        <div style={validBarStyle}></div>
        <div style={invalidBarStyle}></div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>Valid</div>
        <div>Invalid</div>
      </div>
    </div>
  )
}

ResultStats.propTypes = {
  validCount: PropTypes.number.isRequired,
  invalidCount: PropTypes.number.isRequired
}

export default ResultStats
