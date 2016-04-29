import React, { PropTypes } from 'react'
import download from 'downloadjs'

export class ResultsDownload extends React.Component {

  static propTypes = {
    posts: PropTypes.array
  }

  constructor (props) {
    super(props)
    this.handleValidEmailsDownload = this.handleValidEmailsDownload.bind(this)
    this.handleAllResultsDownloads = this.handleAllResultsDownloads.bind(this)
  }

  handleValidEmailsDownload () {
    const emails = this.props.posts.filter((r) => r.status === 'valid').map((r) => r.emailAddress).join('\n')
    download(emails, 'validEmails.txt', 'text/plain')
  }

  handleAllResultsDownloads () {
    let content = 'emailAddress,status\n'
    this.props.posts.map((r) => { content += `${r.emailAddress},${r.status}\n` })
    download(content, 'emailValidationResult.csv', 'text/csv')
  }

  render () {
    return (
      <div style={{display: 'inline-block', margin: '1em auto'}}>
        <button className='btn btn-default' style={{marginRight: '1em'}} onClick={this.handleValidEmailsDownload}>
          <i className='fa fa-download'></i> Download valid addresses as .txt
        </button>
        <button className='btn btn-default' onClick={this.handleAllResultsDownloads}>
          <i className='fa fa-download'></i> Download all results as .csv
        </button>
      </div>
    )
  }
}

export default ResultsDownload
