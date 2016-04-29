import React, { PropTypes } from 'react'

export class ResultsDownload extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    handleValidEmailsDownload: PropTypes.func,
    handleAllResultsDownload: PropTypes.func
  }

  render () {
    return (
      <div style={{display: 'inline-block', margin: '1em auto'}}>
        <button className='btn btn-default' style={{marginRight: '1em'}} onClick={this.props.handleValidEmailsDownload}>
          <i className='fa fa-download'></i> Download valid addresses as .txt
        </button>
        <button className='btn btn-default' onClick={this.props.handleAllResultsDownload}>
          <i className='fa fa-download'></i> Download all results as .csv
        </button>
      </div>
    )
  }
}

export default ResultsDownload
