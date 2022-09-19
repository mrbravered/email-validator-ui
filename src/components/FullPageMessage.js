import React from 'react'
import PropTypes from 'prop-types'

import styles from './FullPageMessage.scss'

class FullPageMessage extends React.Component {

  static propTypes = {
    message: PropTypes.string
  }

  render () {
    return (
      <div className={styles.message}>
        {this.props.message}
      </div>
    )
  }
}

export default FullPageMessage
