import React, { PropTypes } from 'react'
import classNames from 'classnames'

const SingleValidationResult = ({status, emailAddress}) => {
  if (status === '') {
    return null
  } else {
    return (
      <div className={classNames(
        'alert',
        {'alert-success': status === 'valid'},
        {'alert-danger': status === 'invalid'}
      )}>
        {status === 'valid' ? <i className='fa fa-check' aria-hidden='true'></i> : ''}
        {status === 'invalid' ? <i className='fa fa-remove' aria-hidden='true'></i> : ''}
        {status ? `The address ${emailAddress} is ${status}` : ''}
      </div>
    )
  }
}

SingleValidationResult.propTypes = {
  status: PropTypes.string,
  emailAddress: PropTypes.string
}

export default SingleValidationResult
