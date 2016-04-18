import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'

import SingleValidationView from 'views/SingleValidationView'
import BulkValidationView from 'views/BulkValidationView'
import LoginView from 'views/LoginView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='single-email-validation' />
    <Route path='login' component={LoginView} />
    <Route path='single-email-validation' component={SingleValidationView} />
    <Route path='bulk-email-validation' component={BulkValidationView} />
  </Route>
)
