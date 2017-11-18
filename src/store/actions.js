export const APP_INIT_STARTED = 'Init/APP_INIT_STARTED'
export const APP_INIT_FINISHED = 'Init/APP_INIT_FINISHED'
export const SET_APP_INIT_ERROR = 'Init/SET_APP_INIT_ERROR'
// export const SET_APP_INIT_PROGRESS_TEXT = 'Init/SET_APP_INIT_PROGRESS_TEXT'
export const SET_INITIALIZED = 'Init/SET_INITIALIZED'
export const SET_UNINITIALIZED = 'Init/SET_UNINITIALIZED'

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


import push from '../lib/push'
import api from '../lib/api'

/*
 * AJAX Seiteneffekte via redux-thunk -> https://github.com/gaearon/redux-thunk
 */

export function notificationReceived(notification) {
  return {
    type: NOTIFICATION_RECEIVED,
    notification
  }
}

export function notificationOpened(notification) {
  return {
    type: NOTIFICATION_OPENED,
    notification
  }
}

export function doSetDevice(device) {
  return function(dispatch) {
    dispatch(setDeviceId(device))
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
function stopAppInit() {
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


export function doRegisterDevice() {
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
    return api.checkDevice(state.push.device.userId).then(
      responseJsonOrFalse => {
        if (responseJsonOrFalse === false) {
          // Gerät neu registriert
          dispatch(setDeviceVerified(false))
        } else {
          dispatch(setDeviceVerified(responseJsonOrFalse.verified))
        }
        dispatch(stopRegisterDevice())
        dispatch(doGetCategories())
        return Promise.resolve()
      },
      error => {
        console.log(error)
        dispatch(stopRegisterDevice())
        dispatch(setAppInitError(err))
      }
    )
  }
}

function startRegisterDevice() {
  return {
    type: REGISTER_DEVICE_STARTED
  }
}
function stopRegisterDevice() {
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

export function doGetCategories() {
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
        dispatch(stopGetCategories())
        dispatch(doGetSubscriptions())
        return Promise.resolve()
      },
      error => {
        console.log(error)
        dispatch(stopGetCategories())
        dispatch(setAppInitError(err))
      }
    )
  }
}

function startGetCategories() {
  return {
    type: GET_CATEGORIES_STARTED
  }
}
function stopGetCategories() {
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

export function doGetSubscriptions() {
  // console.log('init doGetSubscriptions')
  return function(dispatch, getState) {
    // console.log('call doGetSubscriptions')
    const state = getState()
    if (state.init.subscriptionsLoading) {
      return Promise.resolve()
    }
    dispatch(startGetSubscriptions())
    // dispatch(setAppInitProgressText('Hole Subscriptions..'))
    return api.getSubscriptions(state.push.device.userId).then(
      responseJson => {
        dispatch(setSubscriptions(responseJson))
        dispatch(stopGetSubscriptions())
        dispatch(stopAppInit())
        dispatch(setInitialized())
        return Promise.resolve()
      },
      error => {
        console.log(error)
        dispatch(stopGetSubscriptions())
        dispatch(setAppInitError(err))
      }
    )
  }
}

function startGetSubscriptions() {
  return {
    type: GET_SUBSCRIPTIONS_STARTED
  }
}
function stopGetSubscriptions() {
  return {
    type: GET_SUBSCRIPTIONS_FINISHED
  }
}
function setSubscriptions(subscriptions) {
  return {
    type: SET_SUBSCRIPTIONS,
    subscriptions
  }
}
