import React, { PropTypes } from 'react'
import cn from 'classnames'
import { Link } from 'react-router'
import styles from './ListViewHeader.scss'

class ListViewHeader extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.element,
    total: PropTypes.number
  }

  render () {
    const {loading, title, children, total} = this.props

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
          {children}
        </div>
        <div className={styles.subheader}>
          Records Verified: <strong>{total}</strong>
        </div>
      </div>
    )
  }
}

export default ListViewHeader
