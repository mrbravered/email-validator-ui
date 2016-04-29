import React, { PropTypes } from 'react'
import ResultRow from './ResultRow'

const ResultsTable = ({ posts }) => (
  <table className='table'>
    <thead>
      <tr>
        <th>Email Address</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((result) => <ResultRow key={result.emailAddress} result={result}/>)}
    </tbody>
  </table>
)

ResultsTable.propTypes = {
  posts: PropTypes.array
}

export default ResultsTable
