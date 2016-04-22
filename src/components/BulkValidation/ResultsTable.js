import React, { PropTypes } from 'react'
import ResultRow from './ResultRow'

const ResultsTable = ({ results }) => (
  <table className='table'>
    <thead>
      <tr>
        <th>Email Address</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result) => <ResultRow key={result.emailAddress} result={result}/>)}
    </tbody>
  </table>
)

ResultsTable.propTypes = {
  results: PropTypes.array
}

export default ResultsTable
