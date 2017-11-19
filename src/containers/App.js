import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import configureStore from '../store/configure'
import { Provider } from 'react-redux'
import OneSignalHandler from './OneSignalHandler'
import Router from './AppRouter'

// https://stackoverflow.com/questions/39182274/react-native-does-console-log-hurt-performance-when-going-to-production
// https://stackoverflow.com/questions/38939917/removing-console-log-from-react-native-app
// https://hashnode.com/post/remove-consolelog-statements-in-production-in-react-react-native-apps-cj2rx8yj7003s2253er5a9ovw
if (!__DEV__) {
  console.log = () => {};
}

const {height, width} = Dimensions.get('window')

export default class extends Component {
  render() {
    const store = configureStore()
    return (
      <Provider store={store}>
        <View style={{height, width}}>
          <OneSignalHandler/>
          <Router/>
        </View>
      </Provider>
    )
  }
}
