import React, { PropTypes } from 'react'
import ListItem from 'components/ListItem'

class Lists extends React.Component {
  static propTypes = {
    lists: PropTypes.array,
    onDownloadClick: PropTypes.func
  }

  render () {
    const { lists, onDownloadClick } = this.props
    return (
      <div>
        {lists.map((list) => <ListItem list={list} key={list.id} onDownloadClick={onDownloadClick}/>)}
      </div>
    )
  }
}

export default Lists
