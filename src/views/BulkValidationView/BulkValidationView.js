import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ResultsTable from 'components/BulkValidation/ResultsTable'
import ResultStats from 'components/BulkValidation/ResultStats'
import ResultsDownload from 'components/BulkValidation/ResultsDownload'
import { updateEmailsList, validate } from 'redux/modules/BulkValidation'
import readList from 'utils/listReader'

export class BulkValidation extends React.Component {

  noResultsMessage = 'Enter a list of email addresses and click Validate to see the results of the validation.'

  constructor (props) {
    super(props)
    this.handleEmailsListInputChange = this.handleEmailsListInputChange.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidEmailsDownload = this.handleValidEmailsDownload.bind(this)
    this.handleAllResultsDownloads = this.handleAllResultsDownloads.bind(this)
    this.openUploadDialog = this.openUploadDialog.bind(this)
  }

  handleEmailsListInputChange (e) {
    this.props.onEmailsListInputChange(e.target.value)
  }

  handleFileInputChange (e) {
    readList(e.target.files[0]).then((textList) => this.props.onEmailsListInputChange(textList))
  }

  openUploadDialog () {
    this.refs.fileInput.click()
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  get resultsSection () {
    const { results } = this.props

    const validCount = results.filter((r) => r.status === 'valid').length
    const invalidCount = results.filter((r) => r.status === 'invalid').length
    const unknownCount = results.filter((r) => r.status === 'unknown').length

    return (
      <div>
        <ResultsDownload results={results} />
        <ResultStats validCount={validCount} invalidCount={invalidCount} unknownCount={unknownCount} />
        <ResultsTable results={results} />
      </div>
    )
  }

  render () {
    const { emailsList, isFetching, results } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <h1>Bulk email validation</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <button className='btn btn-default' onClick={this.openUploadDialog}>
                  <i className='fa fa-upload'></i> Upload list of e-mail addresses
                </button>
                <input type='file' style={{display: 'none'}} ref='fileInput' onChange={this.handleFileInputChange} />
              </div>
              <div className='form-group'>
                <textarea
                  disabled={isFetching}
                  rows={6}
                  className='form-control'
                  ref='emailsListInput'
                  onChange={this.handleEmailsListInputChange}
                  value={emailsList}
                ></textarea>
              </div>
              <div className='form-group'>
                <button
                  disabled={emailsList.length === 0}
                  type='submit'
                  className='btn btn-primary btn-block'
                >Validate</button>
              </div>
            </form>
            <div className='page-header'>
              <h2>Results</h2>
            </div>
            {results.length !== 0 ? this.resultsSection : this.noResultsMessage}
          </div>
        </div>
      </div>
    )
  }
}

BulkValidation.propTypes = {
  results: PropTypes.array,
  emailsList: PropTypes.string,
  isFetching: PropTypes.bool,
  onEmailsListInputChange: PropTypes.func,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state) => {
  return state.bulkValidation
}
const mapDispatchToProps = (dispatch) => {
  return {
    onEmailsListInputChange: (emailsList) => dispatch(updateEmailsList(emailsList)),
    onSubmit: (emailsList) => dispatch(validate(emailsList))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkValidation)
