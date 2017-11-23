import api from '../lib/api'
import { Actions } from 'react-native-router-flux';


export const APP_INIT_STARTED = 'Init/APP_INIT_STARTED'
export const APP_INIT_FINISHED = 'Init/APP_INIT_FINISHED'
export const SET_APP_INIT_ERROR = 'Init/SET_APP_INIT_ERROR'
// export const SET_APP_INIT_PROGRESS_TEXT = 'Init/SET_APP_INIT_PROGRESS_TEXT'
export const SET_INITIALIZED = 'Init/SET_INITIALIZED'
export const SET_UNINITIALIZED = 'Init/SET_UNINITIALIZED'

export const PUSH_INIT_STARTED = 'Init/PUSH_INIT_STARTED'
export const PUSH_INIT_FINISHED = 'Init/PUSH_INIT_FINISHED'

export const SET_DEVICE_ID = 'Push/SET_DEVICE_ID'
export const SET_DEVICE_REGISTERED = 'Push/SET_DEVICE_REGISTERED'
export const SET_DEVICE_VERIFIED = 'Push/SET_DEVICE_VERIFIED'

export const NOTIFICATION_OPENED = 'Push/NOTIFICATION_OPENED'
export const NOTIFICATION_RECEIVED = 'Push/NOTIFICATION_RECEIVED'

export const REGISTER_DEVICE_STARTED = 'Init/REGISTER_DEVICE_STARTED'
export const REGISTER_DEVICE_FINISHED = 'Init/REGISTER_DEVICE_FINISHED'

export const GET_CATEGORIES_STARTED = 'Init/GET_CATEGORIES_STARTED'
export const GET_CATEGORIES_FINISHED = 'Init/GET_CATEGORIES_FINISHED'
export const SET_CATEGORIES = 'Init/SET_CATEGORIES'

export const GET_SUBSCRIPTIONS_STARTED = 'Init/GET_SUBSCRIPTIONS_STARTED'
export const GET_SUBSCRIPTIONS_FINISHED = 'Init/GET_SUBSCRIPTIONS_FINISHED'
export const SET_SUBSCRIPTIONS = 'Init/SET_SUBSCRIPTIONS'

export const SET_PERFORMANCE = 'Push/SET_PERFORMANCE'

export const SUBSCRIBE_STARTED = 'Main/SUBSCRIBE_STARTED'
export const SUBSCRIBE_FINISHED = 'Main/SUBSCRIBE_FINISHED'
export const SET_SUBSCRIBE_ERROR = 'Main/SET_SUBSCRIBE_ERROR'

/*
 * AJAX Seiteneffekte via redux-thunk -> https://github.com/gaearon/redux-thunk
 */

export function startPushInit() {
  return {
    type: PUSH_INIT_STARTED,
  }
}
function finishPushInit() {
  return {
    type: PUSH_INIT_FINISHED,
  }
}

export function doSetDevice(device) {
  return function(dispatch) {
    dispatch(setDeviceId(device))
    dispatch(finishPushInit())
    dispatch(doRegisterDevice(device.userId))
  }
}

export function setDeviceId(device) {
  return {
    type: SET_DEVICE_ID,
    device
  }
}

export function setDeviceRegistered(notifData) {
  return {
    type: SET_DEVICE_REGISTERED,
    notifData
  }
}

function startAppInit() {
  return {
    type: APP_INIT_STARTED,
  }
}
function finishAppInit() {
  return {
    type: APP_INIT_FINISHED,
  }
}

// function setAppInitProgress(text: string) {
//   return {
//     type: SET_APP_INIT_PROGRESS_TEXT,
//     error,
//   }
// }

function setAppInitError(error: string) {
  return {
    type: SET_APP_INIT_ERROR,
    error,
  }
}

function setInitialized(){
  return {
    type: SET_INITIALIZED
  }
}
function setUninitialized() {
  return {
    type: SET_UNINITIALIZED
  }
}


function doRegisterDevice() {
  // console.log('init doRegisterDevice')
  return function(dispatch, getState) {
    // console.log('call doRegisterDevice')
    const state = getState()
    if (state.init.registeringDevice) {
      return Promise.resolve()
    }
    dispatch(setUninitialized())
    dispatch(startAppInit())
    dispatch(startRegisterDevice())
    //dispatch(setAppInitProgressText('Registriere Gerät..'))
    // console.log("device", state.device)
    const pushUserId = state.device.userId
    return api.checkDevice(pushUserId).then(
      responseJsonOrFalse => {
        if (responseJsonOrFalse === false) {
          // Gerät neu registriert
          dispatch(setDeviceVerified(false))
          // zur "Hey bitte Gerät bestätigen" Hinweisseite
          Actions.mustVerify()
        } else {
          // Gerät wurde bereits registriert
          dispatch(setDeviceVerified(responseJsonOrFalse.verified))
          if (responseJsonOrFalse.verified === false) {
            // zur "Hey bitte Gerät bestätigen" Hinweisseite
            Actions.mustVerify()
          }
        }
        dispatch(finishRegisterDevice())
        dispatch(doGetCategories())
        return Promise.resolve()
      },
      error => {
        // console.log(error)
        dispatch(finishRegisterDevice())
        dispatch(setAppInitError(error))
      }
    )
  }
}

function startRegisterDevice() {
  return {
    type: REGISTER_DEVICE_STARTED
  }
}
function finishRegisterDevice() {
  return {
    type: REGISTER_DEVICE_FINISHED
  }
}
function setDeviceVerified(verified:boolean) {
  return {
    type: SET_DEVICE_VERIFIED,
    verified
  }
}

function doGetCategories() {
  // console.log('init doGetCategories')
  return function(dispatch, getState) {
    // console.log('call doGetCategories')
    const state = getState()
    if (state.init.categoriesLoading) {
      return Promise.resolve()
    }
    dispatch(startGetCategories())
    // dispatch(setAppInitProgressText('Hole Kategorien..'))
    return api.getCategories().then(
      responseJson => {
        dispatch(setCategories(responseJson))
        dispatch(finishGetCategories())
        dispatch(doGetSubscriptions())
        return Promise.resolve()
      },
      error => {
        // console.log(error)
        dispatch(finishGetCategories())
        dispatch(setAppInitError(error))
      }
    )
  }
}

function startGetCategories() {
  return {
    type: GET_CATEGORIES_STARTED
  }
}
function finishGetCategories() {
  return {
    type: GET_CATEGORIES_FINISHED
  }
}
function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

function doGetSubscriptions() {
  // console.log('init doGetSubscriptions')
  return function(dispatch, getState) {
    // console.log('call doGetSubscriptions')
    const state = getState()
    if (state.init.subscriptionsLoading) {
      return Promise.resolve()
    }
    dispatch(startGetSubscriptions())
    // dispatch(setAppInitProgressText('Hole Subscriptions..'))
    // console.log("push", state.device)
    const pushUserId = state.device.userId
    return api.getSubscriptions(pushUserId).then(
      responseJson => {
        dispatch(setSubscriptions(responseJson, true))
        dispatch(finishGetSubscriptions())
        dispatch(finishAppInit())
        dispatch(setInitialized())
        // Init fertig, weiter zum Main-Screen - es sei denn es ist eine Notification offen
        if (state.push.notification) {
          Actions.eventNotification()
        } else {
          Actions.main()
        }
        return Promise.resolve()
      },
      error => {
        // console.log(error)
        dispatch(finishGetSubscriptions())
        dispatch(setAppInitError(error))
      }
    )
  }
}

function startGetSubscriptions() {
  return {
    type: GET_SUBSCRIPTIONS_STARTED
  }
}
function finishGetSubscriptions() {
  return {
    type: GET_SUBSCRIPTIONS_FINISHED
  }
}
function setSubscriptions(subscriptions, commited:boolean) {
  return {
    type: SET_SUBSCRIPTIONS,
    subscriptions,
    commited
  }
}

export function doNotificationReceive(notification) {
  // console.log('init doNotificationReceive')
  return function(dispatch, getState) {
    // console.log('call doNotificationReceive')
    dispatch(notificationReceived(notification))
    dispatch(doNotificationOpen(notification, false))
  }
}
function notificationReceived(notification) {
  return {
    type: NOTIFICATION_RECEIVED,
    notification
  }
}

export function doNotificationOpen(notification) {
  // console.log('init doNotificationReceive')
  return function(dispatch, getState) {
    // console.log('call doNotificationReceive')
    dispatch(notificationOpened(notification))
    const additionalData = notification.payload.additionalData

    // Geräte-Verifizierungs-Notification?
    if (Object.hasOwnProperty.call(additionalData, 'verification')) {
      let verification = additionalData.verification
      api.verifyDevice(verification).then(
        () => {
          Actions.main()
        },
        error => {
          dispatch(setAppInitError(error))
        }
      )
    } else if (Object.hasOwnProperty.call(additionalData, 'performance')) {
      dispatch(setPerformance(additionalData.performance))
      // TODO per Redux
      Actions.eventNotification({
        // performance: additionalData.performance,
        // back: true
      })
    }
  }
}
function notificationOpened(notification) {
  return {
    type: NOTIFICATION_OPENED,
    notification
  }
}
function setPerformance(performance) {
  return {
    type: SET_PERFORMANCE,
    performance
  }
}

export function doSubscribe() {
  // console.log('init doSubscribe')
  return function(dispatch, getState) {
    // console.log('call doSubscribe')
    const state = getState()
    api.subscribe(state.subscriptions).then(
      () => {
        dispatch(finishSubscribe(true))
        Actions.success({text: 'Wir werden dich bei der nächsten Gelegenheit benachrichtigen.'})
      }).catch((error) => {
        // console.error("onSubscribe", error)
        dispatch(setSubscribeError(error))
        dispatch(finishSubscribe(false))
        Actions.error({text: error, back: true})
      })
  }
}
function startSubscribe() {
  return {
    type: SUBSCRIBE_STARTED
  }
}
function finishSubscribe(commited:boolean) {
  return {
    type: SUBSCRIBE_FINISHED,
    commited
  }
}
function setSubscribeError(error: string) {
  return {
    type: SET_SUBSCRIBE_ERROR,
    error,
  }
}
