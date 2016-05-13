import React, { PropTypes } from 'react'

const ResultStats = ({ report }) => {
  const validWidth = report.valid / report.total * 100
  const invalidWidth = report.invalid / report.total * 100
  const unknownWidth = report.unknown / report.total * 100
  const spamTrapWidth = report.spamtrap / report.total * 100
  const roleBasedWidth = report['role-based'] / report.total * 100
  const acceptAllWidth = report['accept all'] / report.total * 100

  return (
    <div>
      <div>
        <p><strong>Valid:</strong> {report.valid}</p>
        <p><strong>Invalid:</strong> {report.invalid}</p>
        <p><strong>Unknown:</strong> {report.unknown}</p>
        <p><strong>Spam Trap:</strong> {report.spamtrap}</p>
        <p><strong>Role Based:</strong> {report['role-based']}</p>
        <p><strong>Accept All:</strong> {report['accept all']}</p>
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

ResultStats.propTypes = {
  report: PropTypes.object
}

export default ResultStats
