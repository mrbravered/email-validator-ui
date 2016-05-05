import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'
import { validate } from 'redux/modules/BulkValidation'
import readList from 'utils/listReader'
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
      let fileValue = ''
      if (data.file && data.file.length > 0) {
        fileValue = readList(data.file[0])
      }

      Promise.all([data.textarea, fileValue]).then((values) => {
        const text = values.join('\n')
        const trimmed = text.trim()
        const emailsArray = compact(unique(trimmed.split('\n')))
        dispatch(validate(emailsArray, data.name))
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkValidation)
