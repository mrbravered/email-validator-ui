import React, { PropTypes } from 'react'
import cn from 'classnames'

const DownloadButton = ({value, onClick, className}) => (
  <button className={cn('btn btn-default', className)} onClick={onClick}>
    <i className='fa fa-download'></i> {value}
  </button>
)

DownloadButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default DownloadButton
