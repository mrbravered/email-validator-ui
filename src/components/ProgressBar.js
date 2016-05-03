import React, { PropTypes } from 'react'
import filesize from 'filesize'

const ProgressBar = ({ loaded, total }) => {
  const percent = loaded / total * 100
  let readableLoaded
  let readableTotal
  try {
    readableLoaded = filesize(loaded)
    readableTotal = filesize(total)
  } catch (e) {
    readableLoaded = 'unknown'
    readableTotal = 'unknown'
  }
  return (
    <div style={{marginTop: '1em', marginBottom: '1em'}}>
      <div className='progress'>
        <div
          className='progress-bar progress-bar-striped active'
          role='progressbar'
          aria-valuenow={percent}
          aria-valuemin='0'
          aria-valuemax='100'
          style={{width: `${percent}%`}}
        >
          <span className='sr-only'>{percent}% Complete</span>
        </div>
      </div>
      <div style={{textAlign: 'center', width: '100%'}}>
          Uploaded {readableLoaded} from {readableTotal}
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  loaded: PropTypes.number,
  total: PropTypes.number
}

export default ProgressBar
