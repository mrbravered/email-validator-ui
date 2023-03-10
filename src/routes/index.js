import React from 'react'
import { Route, IndexRedirect, Redirect } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import LoginView from 'views/LoginView'
import RegisterView from 'views/RegisterView'
import APIKeyView from 'views/APIKeyView'
import AddEmails from 'views/AddEmailsView'
import SingleValidationView from 'views/SingleValidationView'
import NewListView from 'views/NewListView'
import ListsView from 'views/ListsView'
import ListView from 'views/ListView'
import UserListView from 'views/UserListView'
import UserDetailView from 'views/UserDetailView'

import { logout } from 'redux/modules/Auth'

const isAuthenticated = (store) => {
  return (nextState, replace) => {
    if (!store.getState().auth.currentUser.isLoggedIn) {
      replace({pathname: '/app/login'})
    }
  }
}

const isAdmin = (store) => {
  return (nextState, replace) => {
    if(!store.getState().auth.currentUser.isLoggedIn) {
      replace({pathname: '/app/login'})
    }
    if(store.getState().auth.currentUser.role !== 'Admin') {
      replace({pathname: 'app/lists'})
    }
  }
}

const onLoginEnter = (store) => {
  return (nextState, replace) => {
    store.dispatch(logout())
  }
}

export default (store) => {
  return (
    <Route path='/app' component={CoreLayout}>
      <IndexRedirect to='lists' />
      <Route path='login' component={LoginView} onEnter={onLoginEnter(store)} />
      <Route path='signup' component={RegisterView} onEnter={onLoginEnter(store)} />
      <Route path='users' component={UserListView} onEnter={isAuthenticated(store)} />
      <Route path='users/:id' component={UserDetailView} onEnter={isAuthenticated(store)} />
      <Route path='users/:id/reset-password' component={UserDetailView} onEnter={isAuthenticated(store)} />
      <Route path='add-emails' component={AddEmails} onEnter={isAuthenticated(store)} />
      <Route path='single-email-validation' component={SingleValidationView} onEnter={isAuthenticated(store)} />
      <Route path='lists/new' component={NewListView} onEnter={isAuthenticated(store)} />
      <Route path='lists' component={ListsView} onEnter={isAuthenticated(store)} />
      <Route path='lists/:id' component={ListView} onEnter={isAuthenticated(store)} />
      <Route path='APIKey' component={APIKeyView} onEnter={isAuthenticated(store)} />
      <Redirect from='/' to='/app' />
    </Route>
  )
}
