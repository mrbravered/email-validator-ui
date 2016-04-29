import React from 'react'
import ListsContainer from 'containers/ListsContainer'

export class Lists extends React.Component {

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <div className='page-header'>
              <h1>Validation lists</h1>
            </div>
            <ListsContainer />
          </div>
        </div>
      </div>
      )
  }
}

export default Lists
