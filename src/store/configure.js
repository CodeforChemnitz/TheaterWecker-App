import { Platform } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { persistStore } from 'redux-persist'
import reducer from './reducers'
import devTools from 'remote-redux-devtools'

export default function configureStore() {
  const initialState = {
    initialized: false,
    init: null,
  }
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: Platform.OS,
      hostname: 'localhost',
      port: 5678
    })
  );
  return createStore(reducer, initialState, enhancer);
}