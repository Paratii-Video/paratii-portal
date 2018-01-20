import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from 'reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    reducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk))
  )

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
