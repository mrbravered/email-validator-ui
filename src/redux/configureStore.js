import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'redux/sagas'

export default function configureStore (initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware()

  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
    sagaMiddleware
  )

  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('containers/DevTools').default.instrument()
    middleware = compose(middleware, devTools)
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
