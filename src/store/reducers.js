import {NOTIFICATION_RECEIVED, SET_INITIALIZED} from './actions'

export default function (state:array = [], action:object): State {
  switch (action.type) {
    case SET_INITIALIZED:
      return {...action.daten}

    case SET_DEVICE_ID:
      return {...state, push: {...state.push, device: action.device}}
    case SET_DEVICE_REGISTERED:
      return {...state, push: {...state.push, notifData: action.notifData}}
    case NOTIFICATION_OPENED:
    case NOTIFICATION_RECEIVED:
      return {...state, push: {...state.push, notification: action.notification}}

    default:
      return state
  }
}
