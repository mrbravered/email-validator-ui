import React from 'react'
import PropTypes from 'prop-types'

class HeaderWithRightSpinner extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.element
  }

  render () {
    const {loading, title, children} = this.props
    const styles = {
      pageHeader: {
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        flex: 1
      },
      icon: {
        marginRight: '1em',
        display: loading ? 'block' : 'none'
      }
    }
    return (
      <div className='page-header' style={styles.pageHeader}>
        <h1 style={styles.title}>{title}</h1>
        <i className='fa fa-circle-o-notch fa-3x fa-spin' style={styles.icon} aria-hidden='true'></i>
        {children}
      </div>
    )
  }
}

export default HeaderWithRightSpinner
