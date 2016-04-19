import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import SingleValidationView from 'views/SingleValidationView'
import BulkValidationView from 'views/BulkValidationView'
import LoginView from 'views/LoginView'

export default (store) => {
  const isAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.isLoggedIn) {
      replace({pathname: '/login'})
    }
  }
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRedirect to='single-email-validation' />
      <Route path='login' component={LoginView} />
      <Route path='single-email-validation' component={SingleValidationView} onEnter={isAuthenticated} />
      <Route path='bulk-email-validation' component={BulkValidationView} onEnter={isAuthenticated} />
    </Route>
  )
}
