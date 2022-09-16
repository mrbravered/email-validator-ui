import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Navbar from 'react-bootstrap/lib/Navbar'

const UserActionsDropdown = ({ email, onLogoutLinkClick }) => {
  return (
    <li className='dropdown'>
      <a
        href='#'
        className='dropdown-toggle'
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
  fontSize: '13px'
}

const TopNavbar = ({auth, onLogoutClick}) => {
  const onLogoutLinkClick = (e) => {
    e.preventDefault()
    onLogoutClick()
  }
  return (
    <Navbar default staticTop>
      <div className='container'>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            <Link to='/app/lists'>
              <img src='/app/favicon.png' height='20' style={{display: 'inline', marginRight: '12px'}} />ListQuality
            </Link>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse>
          <ul className='nav navbar-nav navbar-right'>
            <li><Link style={navItemStyle} to={'/app/add-verified-emails'}>Add Verified Emails</Link></li>
            <li><Link style={navItemStyle} to={'/app/single-email-validation'}>Single Email Validation</Link></li>
            <li><Link style={navItemStyle} to={'/app/lists'}>Bulk Email Validation</Link></li>
            {auth.isLoggedIn
            ? <UserActionsDropdown email={auth.email} onLogoutLinkClick={onLogoutLinkClick} />
            : <li><Link style={navItemStyle} to={'/app/login'}>Login</Link></li>}
          </ul>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

TopNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default TopNavbar
