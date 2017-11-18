import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ActivityIndicator, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header'
import push from '../lib/push'
import api from '../lib/api'
import styles from '../styles'
import { doAppInit } from '../store/actions'

// AsyncStorage: https://facebook.github.io/react-native/docs/asyncstorage.html
// ActivityIndicator: https://facebook.github.io/react-native/docs/activityindicator.html

export default class Init extends Component {
  render() {
    return (
        <View style={[styles.body, {flex: 1, flexDirection: 'column'}]}>
          <View style={{flex: 1}}>
            <Header/>
          </View>
          <View style={{flex: 5}}>
              <View style={styles.initContainer}>
                <Text style={{margin: 20}}>{this.props.progressText}</Text>
                {this.props.error ? <Button title="Überspringen" onPress={Actions.main} /> : null}
                {!this.props.error ? <ActivityIndicator size="large" /> : null }
              </View>
          </View>
        </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    error: state.init.error,
    // initialized: state.init.initialized,
    progressText: state.init.progressText,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const InitSceneReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitScene)

export default InitSceneReduxed