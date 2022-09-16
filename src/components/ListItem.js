import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class ListItem extends React.Component {

  static propTypes = {
    list: PropTypes.object,
    onDownloadClick: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.onDownloadClick = this.onDownloadClick.bind(this)
  }

  onDownloadClick () {
    this.props.onDownloadClick(this.props.list.id)
  }

  render () {
    const { list } = this.props

    const styles = {
      panelBody: {
        display: 'flex',
        alignItems: 'center'
      },
      left: {
        flex: 1,
        paddingRight: '2em'
      },
      metadata: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-body' style={styles.panelBody}>
          <div style={styles.left}>
            <Link to={`/app/lists/${list.id}`}><h3>{list.name || list.id}</h3></Link>
            <div style={styles.metadata}>
              <div>{list.report.total} email addresses</div>
              <div>Quality score: <strong>{list.report.qualityScore}</strong></div>
            </div>
          </div>
          <div>
            <button className='btn btn-default' onClick={this.onDownloadClick}>
              <i className='fa fa-download'></i> Download
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem
