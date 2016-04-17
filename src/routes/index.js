import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'

import SingleValidationView from 'views/SingleValidationView'
import BulkValidationView from 'views/BulkValidationView'
import LoginView from 'views/LoginView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='login' component={LoginView} />
    <Route path='single-email-validation' component={SingleValidationView} />
    <Route path='bulk-email-validation' component={BulkValidationView} />
  </Route>
)
