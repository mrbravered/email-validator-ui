import React, { PropTypes } from 'react'
import ResultsContainer from 'containers/ResultsContainer'

const ListView = ({ params }) => (
  <div className='container'>
    <ResultsContainer id={params.id} />
  </div>
)

ListView.propTypes = {
  params: PropTypes.object
}

export default ListView
