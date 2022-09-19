import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'containers/Navbar'
import '../../styles/core.scss'

export class CoreLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render () {
    return (
      <div>
        <Navbar />
        <div>
        {this.props.children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
