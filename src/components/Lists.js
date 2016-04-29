import React, { PropTypes } from 'react'
import ListItem from 'components/ListItem'

const Lists = ({ lists }) => (
  <div>
    {lists.map((list) => <ListItem list={list} key={list.id} />)}
  </div>
)

Lists.propTypes = {
  lists: PropTypes.array
}

export default Lists
