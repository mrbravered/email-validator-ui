import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { validate } from 'redux/modules/BulkValidation'
import NewListForm from 'forms/NewListForm'

export class BulkValidation extends React.Component {

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2'>
            <h1>Bulk email validation</h1>

            <NewListForm {...this.props} />

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
      }
      if (data.textarea) {
        addresses = addresses.concat(data.textarea.split('\n'))
      }
      dispatch(validate(addresses, data.name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkValidation)
