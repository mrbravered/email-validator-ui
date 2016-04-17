import React, { PropTypes } from 'react'
import classNames from 'classnames'

const BulkValidationResultRow = ({result}) => (
  <tr className={classNames(
      {'success': result.status === 'valid'},
      {'danger': result.status === 'invalid'}
    )}>
    <td>{result.emailAddress}</td>
    <td>{result.status}</td>
  </tr>
)

BulkValidationResultRow.propTypes = {
  result: PropTypes.shape({
    emailAddress: PropTypes.string,
    status: PropTypes.string
  }).isRequired
}

export default BulkValidationResultRow
