import React, { Component } from 'react'
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import Init from '../scenes/Init'
import Main from '../scenes/Main'
import Error from '../scenes/Error'
import Success from '../scenes/Success'
import MustVerify from '../scenes/MustVerify'
import EventNotification from '../scenes/EventNotification'
import Webview from '../scenes/Webview'

// Router Tuorial: https://github.com/aksonov/react-native-router-flux/blob/master/docs/MINI_TUTORIAL.md
// Ext. Tutorial: https://github.com/aksonov/react-native-router-flux/blob/master/docs/DETAILED_EXAMPLE.md
//     Code dazu: https://github.com/aksonov/react-native-router-flux/blob/master/Example/Example.js


// ggf. auf Redux umbauen?
// https://medium.com/@ian.mundy/using-react-native-router-flux-with-redux-9b10be35cd37



export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="init" component={Init} initial={true} type={ActionConst.REPLACE} />
          <Scene key="main" component={Main} type={ActionConst.REPLACE} />
          <Scene key="error" component={Error} title="Fehler" />
          <Scene key="success" component={Success} title="Success" />
          <Scene key="mustVerify" component={MustVerify}  type={ActionConst.REPLACE} />
          <Scene key="eventNotification" component={EventNotification} type={ActionConst.REPLACE} />
          <Scene key="webview" hideNavBar={false} component={Webview} />
        </Scene>
      </Router>
    )
  }
}
