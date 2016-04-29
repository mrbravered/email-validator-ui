import React, { PropTypes } from 'react'
import ResultsContainer from 'containers/ResultsContainer'

const ListView = ({ params }) => (
  <div className='container'>
    <div className='row'>
      <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
        <ResultsContainer id={params.id} />
      </div>
    </div>
  </div>
)

ListView.propTypes = {
  params: PropTypes.object
}

export default ListView
