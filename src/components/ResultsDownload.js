import React, { PropTypes } from 'react'
import DownloadButton from 'components/DownloadButton'

export class ResultsDownload extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    handleValidEmailsDownload: PropTypes.func,
    handleAllResultsDownload: PropTypes.func
  }

  render () {
    return (
      <div style={{display: 'block', margin: '1em auto'}}>
        <DownloadButton value='All results' onClick={this.props.handleAllResultsDownload} />
        <DownloadButton value='Valid addresses' onClick={this.props.handleValidEmailsDownload} />
      </div>
    )
  }
}

export default ResultsDownload
