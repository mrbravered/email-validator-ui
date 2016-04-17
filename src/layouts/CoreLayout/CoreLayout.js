import React, { PropTypes } from 'react'
import '../../styles/core.scss'
import Navbar from 'components/Navbar/Navbar'

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
