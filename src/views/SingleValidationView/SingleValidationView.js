import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import SingleValidationResult from 'components/SingleValidationResult'

import { updateEmail, validate } from 'redux/modules/SingleValidation'

export class SingleValidation extends React.Component {
  constructor (props) {
    super(props)
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailInputChange (e) {
    this.props.onEmailInputChange(e.target.value)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.refs.emailInput.value)
  }

  render () {
    const { status, emailAddress, isFetching, error } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <div className='page-header'>
              <h1>Single email validation</h1>
            </div>
            <form onSubmit={this.handleSubmit}>

              <div className={classNames(
                'form-group',
                {'has-success': status === 'valid'},
                {'has-error': status === 'invalid'}
              )}>
                <input
                  type='email'
                  ref='emailInput'
                  className='form-control'
                  onChange={this.handleEmailInputChange}
                  value={emailAddress}
                  disabled={isFetching}
                />
              </div>

              <div className='form-group'>
                <button type='submit' className='btn btn-block btn-primary'>Validate</button>
              </div>
            </form>
            {error ? <div className='alert alert-danger'>Error: {error}</div> : ''}
            <SingleValidationResult emailAddress={emailAddress} status={status} />
          </div>
        </div>
      </div>
    )
  }
}

SingleValidation.propTypes = {
  error: PropTypes.string,
  status: PropTypes.string,
  emailAddress: PropTypes.string,
  isFetching: PropTypes.bool,
  onEmailInputChange: PropTypes.func,
  onSubmit: PropTypes.func
}

const mapStateToProps = (state) => {
  return state.singleValidation
}
const mapDispatchToProps = (dispatch) => {
  return {
    onEmailInputChange: (emailAddress) => dispatch(updateEmail(emailAddress)),
    onSubmit: (emailAddress) => dispatch(validate(emailAddress))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleValidation)
