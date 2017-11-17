import React, { Component } from 'react'
import { Router, Scene, ActionConst, Reducer } from 'react-native-router-flux';
import Init from '../scenes/init'
import Main from '../scenes/main'
import Fehler from '../scenes/error'
import Success from '../scenes/success'
import MustVerify from '../scenes/mustVerify'
import EventNotification from '../scenes/eventNotification'
import Webview from '../scenes/webview'
import { notificationReceived, notificationOpened, setDeviceId, setDeviceRegistered } from '../store/actions'


// Router Tuorial: https://github.com/aksonov/react-native-router-flux/blob/master/docs/MINI_TUTORIAL.md
// Ext. Tutorial: https://github.com/aksonov/react-native-router-flux/blob/master/docs/DETAILED_EXAMPLE.md
//     Code dazu: https://github.com/aksonov/react-native-router-flux/blob/master/Example/Example.js

class AppWithRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="init" component={Init} initial={true} type={ActionConst.REPLACE} />
          <Scene key="main" component={Main} type={ActionConst.REPLACE} />
          <Scene key="error" component={Fehler} title="Fehler" />
          <Scene key="success" component={Success} title="Success" />
          <Scene key="mustVerify" component={MustVerify}  type={ActionConst.REPLACE} />
          <Scene key="eventNotification" component={EventNotification} type={ActionConst.REPLACE} />
          <Scene key="webview" hideNavBar={false} component={Webview} />
        </Scene>
      </Router>
    )
  }
}

class AppWithRouterAndOneSignal extends Component {

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
    this.props.notificationReceived(notification)
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    this.props.notificationOpened(openResult.notification)
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
    this.props.setDeviceRegistered(notifData)
  }

  onIds(device) {
    console.log('Device info: ', device);
    this.props.setDeviceId(device)
  }

  render() {
    return <AppWithRouter/>
  }
}


const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setDeviceId: device => dispatch(setDeviceId(device)),
    setDeviceRegistered: notifData => dispatch(setDeviceRegistered(notifData)),
    notificationOpened: notification => dispatch(notificationOpened(notification)),
    notificationReceived: notification => dispatch(notificationReceived(notification))
  }
}

const AppWithRouterAndOneSignalReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithRouterAndOneSignal)

export default class extends Component {
  render() {
    const store = configureStore()
    return (
      <Provider store={store}>
        <AppWithRouterAndOneSignalReduxed/>
      </Provider>
    )
  }
}
