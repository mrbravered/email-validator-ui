import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import classNames from 'classnames'
import styles from './Navbar.scss'
import { IoMdMenu } from "react-icons/io";

const UserActionsDropdown = ({ email, onLogoutLinkClick }) => {
  return (
    <li className='dropdown'>
      <a
        href='#'
        className={classNames(
          'dropdown-toggle',
          styles.navbarItem
        )}
        data-toggle='dropdown'
        role='button'
        aria-haspopup='true'
        aria-expanded='false'
        style={{textTransform: 'lowercase', fontSize: '13px'}}
      >{email} <span className='caret'></span>
      </a>
      <ul className='dropdown-menu'>
        <li><Link to='/app/APIKey'>See APIKey</Link></li>
        <li><a href='#' onClick={onLogoutLinkClick}>Logout</a></li>
      </ul>
    </li>
  )
}

UserActionsDropdown.propTypes = {
  email: PropTypes.string,
  onLogoutLinkClick: PropTypes.func
}

const navItemStyle = {
  textTransform: 'capitalize',
  fontSize: '13px',
  color: 'rgb(137,148,135)'
}

const navbarStyle = {
  backgroundColor: 'rgb(45,55,65)',
  borderRadius: '0px',
}

const TopNavbar = ({currentUser, onLogoutClick}) => {
  const onLogoutLinkClick = (e) => {
    e.preventDefault()
    onLogoutClick()
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light' style={navbarStyle}>
      <div className='container'>
        <div className='navbar-brand'>
          <div>
            <Link to='/app/lists'>
              <img src='/app/favicon.png' height='20' style={{display: 'inline', marginRight: '12px'}} />ListQuality
            </Link>
          </div>
        </div>
        <div className='navbar-right' style={{height: '60px', display: 'flex', alignItems: 'center'}}>
          <button className={styles.navbarToggler} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <IoMdMenu size={28} />
          </button>
        </div>
        <div className='navbar-collapse collapse' id="navbarSupportedContent">
          <ul className='nav navbar-nav navbar-right'>
          {currentUser.isLoggedIn ?
            <React.Fragment>
              { currentUser.role === 'Admin' &&
              <React.Fragment>
                <li><Link className={styles.navbarItem} to={'/app/users'}>User Management</Link></li>
                <li><Link className={styles.navbarItem} to={'/app/add-emails'}>Add Emails</Link></li>
                </React.Fragment>
              }
              <li><Link className={styles.navbarItem} to={'/app/lists'}>Bulk Email Validation</Link></li>
              <li><Link className={styles.navbarItem} to={'/app/single-email-validation'}>Single Email Validation</Link></li>
              <UserActionsDropdown email={currentUser.email} onLogoutLinkClick={onLogoutLinkClick} />
            </React.Fragment> :
            <React.Fragment>
              <li><Link className={styles.navbarItem} to={'/app/login'}>Login</Link></li>
              <li><Link className={styles.navbarItem} to={'/app/signup'}>Register</Link></li>
            </React.Fragment>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

TopNavbar.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default TopNavbar
