export const APP_INIT_STARTED = 'APP_INIT_STARTED'
export const APP_INIT_FINISHED = 'APP_INIT_FINISHED'
export const SET_APP_INIT_ERROR = 'SET_APP_INIT_ERROR'
export const SET_APP_INIT_PROGRESS_TEXT = 'SET_APP_INIT_PROGRESS_TEXT'
export const SET_INITIALIZED = 'SET_INITIALIZED'
export const SET_UNINITIALIZED = 'SET_UNINITIALIZED'

export const SET_DEVICE_ID = 'SET_DEVICE_ID'
export const SET_DEVICE_REGISTERED = 'SET_DEVICE_REGISTERED'
export const NOTIFICATION_OPENED = 'NOTIFICATION_OPENED'
export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED'

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


export function doAppInit() {
  return function(dispatch, getState) {
    const state = getState()
    if (state.init.initialized) {
      return Promise.resolve()
    }
    dispatch(startAppInitLoading())

  }
}

export function startAppInitLoading() {
  return {
    type: APP_INIT_STARTED,
  }
}
export function stopAppInitLoading() {
  return {
    type: APP_INIT_FINISHED,
  }
}
export function setAppInitProgress(text: string) {
  return {
    type: SET_APP_INIT_PROGRESS_TEXT,
    error,
  }
}
export function setAppInitError(error: string) {
  return {
    type: SET_APP_INIT_ERROR,
    error,
  }
}

export function setInitialized():Action {
  return {
    type: SET_INITIALIZED
  }
}
export function setUninitialized():Action {
  return {
    type: SET_UNINITIALIZED
  }
}


