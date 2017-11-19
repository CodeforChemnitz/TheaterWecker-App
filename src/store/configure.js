import { Platform } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// import { persistStore } from 'redux-persist'
import reducer from './reducers'
import devTools from 'remote-redux-devtools'

export default function configureStore() {
  const initialState = {
    initialized: false,
    init: {
      error: false,
      progressText: '',
      initialisingPush: false,
      registeringDevice: false,
      categoriesLoading: false,
      subscriptionsLoading: false,
    },
    push: {
      notification: null,
    },
    device: {
      notifData: null,
      verified: null,
    },
    categories: [],
    subscriptions: [],
    performance: {},
  }
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
    // is disabled on production -> https://github.com/zalmoxisus/remote-redux-devtools#enabling
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    })
  );
  return createStore(reducer, initialState, enhancer);
}