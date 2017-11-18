import React, { Component } from 'react'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import {
  doNotificationReceive, doNotificationOpen, doSetDevice,
  setDeviceRegistered, startPushInit,
} from '../store/actions'

class OneSignalHandler extends Component {

  componentWillMount() {
    this.props.setPushInitStarted()
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
    this.props.doNotificationReceive(notification)
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    this.props.doNotificationOpen(openResult.notification)
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
    this.props.setDeviceRegistered(notifData)
  }

  onIds(device) {
    console.log('Device info: ', device);
    console.log('UserId ', device.userId)
    console.log('PushToken: ', device.pushToken)
    this.props.doSetDevice(device)
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setPushInitStarted: () => dispatch(startPushInit()),
    doSetDevice: device => dispatch(doSetDevice(device)),
    setDeviceRegistered: notifData => dispatch(setDeviceRegistered(notifData)),
    doNotificationOpen: notification => dispatch(doNotificationOpen(notification)),
    doNotificationReceive: notification => dispatch(doNotificationReceive(notification)),
  }
}

const OneSignalHandlerReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(OneSignalHandler)

export default OneSignalHandlerReduxed

