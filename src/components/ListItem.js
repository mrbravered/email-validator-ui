import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const ListItem = ({ list }) => (
  <div className='panel panel-default'>
    <div className='panel-body'>
      <Link to={`/app/lists/${list.id}`}><h3>{list.id}</h3></Link>
      <div>{list.report.total} email addresses</div>
    </div>
  </div>
)

ListItem.propTypes = {
  list: PropTypes.object
}

export default ListItem
