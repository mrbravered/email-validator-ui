import React from 'react'
import { Route, IndexRedirect, Redirect } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import LoginView from 'views/LoginView'
import SingleValidationView from 'views/SingleValidationView'
import BulkValidationView from 'views/BulkValidationView'
import ListsView from 'views/ListsView'
import ListView from 'views/ListView'

import { fetchLists } from 'redux/modules/Lists'

const isAuthenticated = (store) => {
  return (nextState, replace) => {
    if (!store.getState().auth.isLoggedIn) {
      replace({pathname: '/app/login'})
    }
  }
}

const onListsEnter = (store) => {
  return (nextState, replace) => {
    store.dispatch(fetchLists())
    isAuthenticated(store)(nextState, replace)
  }
}

export default (store) => {
  return (
    <Route path='/app' component={CoreLayout}>
      <IndexRedirect to='lists' />
      <Route path='login' component={LoginView} />
      <Route path='single-email-validation' component={SingleValidationView} onEnter={isAuthenticated(store)} />
      <Route path='bulk-email-validation' component={BulkValidationView} onEnter={isAuthenticated(store)} />
      <Route path='lists' component={ListsView} onEnter={onListsEnter(store)} />
      <Route path='lists/:id' component={ListView} onEnter={isAuthenticated(store)} />

      <Redirect from='/' to='/app' />
    </Route>
  )
}
