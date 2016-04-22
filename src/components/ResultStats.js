import React, { PropTypes } from 'react'

const ResultStats = ({validCount, invalidCount, unknownCount = 0}) => {
  const totalCount = validCount + invalidCount + unknownCount
  const validWidth = validCount / totalCount * 100
  const invalidWidth = invalidCount / totalCount * 100
  const unknownWidth = unknownCount / totalCount * 100
  return (
    <div>
      <div>
        <p><strong>Valid:</strong> {validCount}</p>
        <p><strong>Invalid:</strong> {invalidCount}</p>
        <p><strong>Unknown:</strong> {unknownCount}</p>
      </div>
      <div className='progress'>
        <div className='progress-bar progress-bar-success' style={{width: validWidth + '%'}}></div>
        <div className='progress-bar progress-bar-info' style={{width: unknownWidth + '%'}}></div>
        <div className='progress-bar progress-bar-danger' style={{width: invalidWidth + '%'}}></div>
      </div>
    </div>
    )
}

ResultStats.propTypes = {
  validCount: PropTypes.number.isRequired,
  invalidCount: PropTypes.number.isRequired,
  unknownCount: PropTypes.number
}

export default ResultStats
