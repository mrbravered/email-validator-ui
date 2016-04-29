import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import LoginView from 'views/LoginView'
import SingleValidationView from 'views/SingleValidationView'
import BulkValidationView from 'views/BulkValidationView'
import ListsView from 'views/ListsView'
import ListView from 'views/ListView'

export default (store) => {
  const isAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.isLoggedIn) {
      replace({pathname: '/login'})
    }
  }
  return (
    <Route path='/app' component={CoreLayout}>
      <IndexRedirect to='single-email-validation' />
      <Route path='login' component={LoginView} />
      <Route path='single-email-validation' component={SingleValidationView} onEnter={isAuthenticated} />
      <Route path='bulk-email-validation' component={BulkValidationView} onEnter={isAuthenticated} />
      <Route path='lists' component={ListsView} onEnter={isAuthenticated} />
      <Route path='lists/:id' component={ListView} onEnter={isAuthenticated} />
    </Route>
  )
}
