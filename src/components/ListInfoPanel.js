import React from 'react'
import PropTypes from 'prop-types'

import styles from './ListInfoPanel.scss'

class ListInfoPanel extends React.Component {

  static propTypes = {
    listCount: PropTypes.number,
    users: PropTypes.array,
    handleUserSelectChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: '',
      seletedFilterDate: ''
    };
  }

  render () {
    const { listCount, users, handleUserSelectChange } = this.props

    return (
      <div className={styles.infoPanel}>
        <div className={styles.selectLabel}>
          <label className={styles.selectLabel}>Filtered by</label>
        </div>
        <div className={styles.selectField}>
          <select
            className={styles.formControl}
            id="exampleFormControlSelect1"
            onChange={
              (e) => {
                this.setState({
                  selectedUserId: e.currentTarget.value,
                  seletedFilterDate: ''
                });
                handleUserSelectChange(e.currentTarget.value, '')
              }
            }>
            <option value="">All</option>
            {users.map((user, index) => 
              <option key={index} value={user.id}>{user.name}</option>
            )}
          </select>
        </div>
        <div className={styles.selectField}>
          <select
            className={styles.formControl}
            id="exampleFormControlSelect1"
            value={this.state.seletedFilterDate}
            onChange={
              (e) => {
                this.setState({
                  ...this.state,
                  seletedFilterDate: e.currentTarget.value
                });
                handleUserSelectChange(this.state.selectedUserId, e.currentTarget.value)
              }
            }
          >
            <option value=''>All</option>
            <option value='this_month'>This month</option>
          </select>
        </div>
        <div className={styles.listCountField}>
          <span className='text-muted'>Here are <b>{listCount}</b> items</span>
        </div>
      </div>
    )
  }
}

export default ListInfoPanel
