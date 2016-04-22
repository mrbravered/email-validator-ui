import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Navbar = ({auth, onLogoutClick}) => {
  const onLogoutLinkClick = (e) => {
    e.preventDefault()
    onLogoutClick()
  }
  return (
    <nav className='navbar navbar-default navbar-static-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
            aria-expanded='false'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a className='navbar-brand' href='#'>ListQuality</a>
        </div>

        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav navbar-right'>
            <li className='active'><Link to={'/single-email-validation'}>Single Email Validation</Link></li>
            <li><Link to={'/bulk-email-validation'}>Bulk Email Validation</Link></li>
            {auth.isLoggedIn
            ? <li><a href='#' onClick={onLogoutLinkClick}>Logout</a></li>
            : <li><Link to={'/login'}>Login</Link></li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default Navbar
