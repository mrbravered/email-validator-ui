import React, { PropTypes } from 'react'
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
    console.log ('rar')
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
        flex: 1
      }
    }
    return (
      <div className='panel panel-default'>
        <div className='panel-body' style={styles.panelBody}>
          <div style={styles.left}>
            <Link to={`/app/lists/${list.id}`}><h3>{list.id}</h3></Link>
            <div>{list.report.total} email addresses</div>
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
