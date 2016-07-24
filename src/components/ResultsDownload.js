import React, { PropTypes } from 'react'
import DownloadButton from 'components/DownloadButton'

import styles from './ResultsDownload.scss'

export class ResultsDownload extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    handleValidEmailsDownload: PropTypes.func,
    handleAllResultsDownload: PropTypes.func
  }

  render () {
    return (
      <div className={styles.buttonsWrapper}>
        <DownloadButton
          value='All results'
          className={styles.downloadButton}
          onClick={this.props.handleAllResultsDownload}
        />
        <DownloadButton
          value='Valid addresses'
          className={styles.downloadButton}
          onClick={this.props.handleValidEmailsDownload}
        />
      </div>
    )
  }
}

export default ResultsDownload
