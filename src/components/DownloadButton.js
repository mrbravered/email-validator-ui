import React, { PropTypes } from 'react'

const DownloadButton = ({value, onClick}) => (
  <button className='btn btn-default btn-block' style={{marginBottom: '1em'}} onClick={onClick}>
    <i className='fa fa-download'></i> {value}
  </button>
)

DownloadButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
}

export default DownloadButton
