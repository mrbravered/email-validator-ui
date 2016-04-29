import React, { PropTypes } from 'react'

const HeaderWithRightSpinner = ({ title, loading }) => {
  const styles = {
    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    icon: {
      display: loading ? 'block' : 'none'
    }
  }
  return (
    <div className='page-header' style={styles.pageHeader}>
      <h1>{title}</h1>
      <i className='fa fa-circle-o-notch fa-3x fa-spin' style={styles.icon} aria-hidden='true'></i>
    </div>
  )
}
HeaderWithRightSpinner.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string
}

export default HeaderWithRightSpinner
