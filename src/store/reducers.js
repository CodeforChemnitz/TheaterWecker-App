import {
  SET_INITIALIZED, SET_UNINITIALIZED,
  APP_INIT_STARTED, APP_INIT_FINISHED, SET_APP_INIT_ERROR,
  PUSH_INIT_STARTED, PUSH_INIT_FINISHED,
  SET_DEVICE_ID, SET_DEVICE_REGISTERED, SET_DEVICE_VERIFIED,
  NOTIFICATION_RECEIVED, NOTIFICATION_OPENED,
  REGISTER_DEVICE_STARTED, REGISTER_DEVICE_FINISHED,
  GET_CATEGORIES_STARTED, GET_CATEGORIES_FINISHED, SET_CATEGORIES,
  GET_SUBSCRIPTIONS_STARTED, GET_SUBSCRIPTIONS_FINISHED, SET_SUBSCRIPTIONS,
  SET_PERFORMANCE,
  SUBSCRIBE_STARTED, SUBSCRIBE_FINISHED, SET_SUBSCRIBE_ERROR
} from './actions'

export default function (state:array = [], action:object): State {
  switch (action.type) {
    case SET_INITIALIZED:
      return {...state, initialized: true}
    case SET_UNINITIALIZED:
      return {...state, initialized: false}
    case APP_INIT_STARTED:
      return {...state, init: {...state.init, error: false, progressText: 'Gleich gehts los..', skipButton: false, spinner:true}}
    case APP_INIT_FINISHED:
      return {...state, init: {...state.init, progressText: 'Initialisierung abgeschlossen.'}}
    case SET_APP_INIT_ERROR:
      return {...state, init: {...state.init, error: true, progressText: 'Es ist ein Fehler aufgetreten: ' + action.error}}

    case PUSH_INIT_STARTED:
      return {...state, init: {...state.init, initialisingPush: true, progressText: 'Initialisiere Push Dienst..'}}
    case PUSH_INIT_FINISHED:
      return {...state, init: {...state.init, initialisingPush: false, progressText: 'Push Dienst initalisiert.'}}

    case SET_DEVICE_ID:
      return {...state, device: {...state.device, ...action.device}}
    case SET_DEVICE_REGISTERED:
      return {...state, device: {...state.device, notifData: action.notifData}}
    case SET_DEVICE_VERIFIED:
      return {...state, device: {...state.device, verified: action.verified}}

    case NOTIFICATION_OPENED:
    case NOTIFICATION_RECEIVED:
      return {...state, push: {...state.push, notification: action.notification}}

    case REGISTER_DEVICE_STARTED:
      return {...state, init: {...state.init, registeringDevice: true, progressText: 'Registriere Gerät..'}}
    case REGISTER_DEVICE_FINISHED:
      return {...state, init: {...state.init, registeringDevice: false, progressText: 'Gerät registriert.'}}

    case GET_CATEGORIES_STARTED:
      return {...state, init: {...state.init, categoriesLoading: true, progressText: 'Hole Kategorien..'}}
    case GET_CATEGORIES_FINISHED:
      return {...state, init: {...state.init, categoriesLoading: false, progressText: 'Kategorien aktualisiert.'}}
    case SET_CATEGORIES:
      return {...state, categories: action.categories}

    case GET_SUBSCRIPTIONS_STARTED:
      return {...state, init: {...state.init, subscriptionsLoading: true, progressText: 'Hole Subscriptions..'}}
    case GET_SUBSCRIPTIONS_FINISHED:
      return {...state, init: {...state.init, subscriptionsLoading: false, progressText: 'Subscriptions aktualisiert.'}}
    case SET_SUBSCRIPTIONS:
      return {...state, subscriptions: action.subscriptions, subscribeCommited: action.commited }

    case SET_PERFORMANCE:
      return {...state, performance: action.performance}

    case SUBSCRIBE_STARTED:
      return {...state, subscribeCommited: false, subscribeError: ''}
    case SUBSCRIBE_FINISHED:
      return {...state, subscribeCommited: action.commited}
    case SET_SUBSCRIBE_ERROR:
      return {...state, subscribeError: action.error}

    default:
      return state
  }
}
