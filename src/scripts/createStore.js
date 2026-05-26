import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from 'reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Notification deduplication middleware
// Prevents duplicate notifications with the same title from stacking
// When a duplicate is triggered, the existing notification shakes instead
const activeTitles: Set<string> = new Set()

export const notificationDedupMiddleware = store => next => action => {
  // react-notification-system-redux dispatches NOTIFY actions
  if (action.type === '@@redux-notifications/NOTIFY' && action.payload) {
    const title = action.payload.title
    const titleKey = typeof title === 'string'
      ? title
      : title && title.props && title.props.message
        ? title.props.message
        : String(title || '')

    if (titleKey && activeTitles.has(titleKey)) {
      // Duplicate — shake existing notification instead of adding a new one
      store.dispatch({ type: '@@redux-notifications/SHAKE', payload: { title: titleKey } })
      return
    }

    if (titleKey) {
      activeTitles.add(titleKey)
    }
  }

  // Clear tracking when all notifications are removed
  if (action.type === '@@redux-notifications/NOTIFY_CLEAR') {
    activeTitles.clear()
  }

  return next(action)
}

export default () => {
  const store = createStore(
    reducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk, notificationDedupMiddleware))
  )

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
