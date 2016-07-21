import React, { PropTypes } from 'react'
import cn from 'classnames'
import { Link } from 'react-router'
import styles from './ListViewHeader.scss'

class ListViewHeader extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.object
  }

  render () {
    const {loading, list} = this.props
    const title = list ? list.name || list.id : ''
    const total = list ? list.report.total : ''
    return (
      <div className={styles.wrapper}>
        <div className={cn(styles.pageHeader)} >
          <h1 className={styles.title}>
            <Link to='/app/lists' className={styles.backLink}>All Lists</Link>
            <span className={styles.slash}> / </span>
            {title}
          </h1>
          <i
            className={cn('fa fa-circle-o-notch fa-3x fa-spin', styles.icon)}
            style={{display: loading ? 'block' : 'none'}}
            aria-hidden='true'
          ></i>
        </div>
        <div className={styles.subheader}>
          Records Verified: <span className={styles.total}>{total}</span>
        </div>
      </div>
    )
  }
}

export default ListViewHeader
