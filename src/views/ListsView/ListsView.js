import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ListsContainer from 'containers/ListsContainer'
import HeaderWithRightSpinner from 'components/HeaderWithRightSpinner'

export class Lists extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool
  }

  render () {
    const { isFetching } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3'>
            <HeaderWithRightSpinner title='Validation Lists' loading={isFetching} />
            <ListsContainer />
          </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.lists.isFetching
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)
