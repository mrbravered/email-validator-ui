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
      <div style={{display: 'inline-block', margin: '1em auto'}}>
        <DownloadButton value='Download all results' onClick={this.props.handleAllResultsDownload} />
        <DownloadButton value='Download valid addresses' onClick={this.props.handleValidEmailsDownload} />
      </div>
    )
  }
}

export default ResultsDownload
