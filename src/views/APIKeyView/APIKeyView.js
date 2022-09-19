import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class APIKeyView extends React.Component {

  static propTypes = {
    APIKey: PropTypes.string
  }

  render () {
    const { APIKey } = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <div className='page-header'>
              <h3>API Key</h3>
            </div>
            <div>
              <p>Use this key to authorize API requests.</p>
              <pre>{APIKey}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    APIKey: state.auth.APIKey
  }
}

export default connect(
  mapStateToProps
)(APIKeyView)
