import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { upload } from 'redux/modules/EmailUpload'
import EmailUploadForm from 'forms/EmailUploadForm'

export class BulkValidation extends React.Component {

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2'>
            <h1>Add Emails</h1>

            <EmailUploadForm {...this.props} />

            {this.props.error ? <div className='alert alert-danger'>Error: {this.props.error}</div> : ''}
          </div>
        </div>
      </div>
    )
  }
}

BulkValidation.propTypes = {
  error: PropTypes.string,
  uploading: PropTypes.bool,
  onSubmit: PropTypes.func,
  uploadProgress: PropTypes.object
}

const mapStateToProps = (state) => {
  return state.bulkValidation
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      // The emailAddresses sent is a merge between
      // the values in the file and the textarea
      let addresses = []
      if (data.file) {
        addresses = addresses.concat(data.file)
        addresses = addresses.map((emailData)=>{
          const currentData = emailData.replace('\r', '').split(',')
          const now = new Date()
          return {
            'emailAddress': currentData[0],
            'status': currentData[1] ? currentData[1] : data.isValid? 'Valid' : 'Invalid',
            'date': currentData[2] ? currentData[2] : now.toISOString()
          }
        })
        addresses.shift()
      }
      dispatch(upload(addresses, data.name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkValidation)
