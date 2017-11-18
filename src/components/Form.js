import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import RadioButtonGroup from './form/RadioButtonGroup'
// import { Actions } from 'react-native-router-flux'
import styles from '../styles'
// import api from '../lib/api'
import { connect } from 'react-redux'
import { setSubscriptions, doSubscribe } from '../store/actions'

// Button: https://facebook.github.io/react-native/docs/button.html

export default class Form extends Component {
  
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     categoriesPossible: [],
  //     categoryIdsSelected: []
  //   }
  //   Promise.all([AsyncStorage.getItem('@TW:categories'), AsyncStorage.getItem('@TW:subscriptions')])
  //     .then(([cats, subs]) => {
  //       try {
  //         console.log("Categories!", cats)
  //         console.log("Subscriptions!", subs)
  //         this.setState({categoriesPossible: JSON.parse(cats)})
  //         this.setState({categoryIdsSelected: JSON.parse(subs)})
  //       } catch(error) {
  //         console.error(error)
  //       }
  //     })
  // }

  // onSubscribe() {
  //   console.log("Abonnieren..", this.state)
  //   new Promise((resolve, reject) =>  {
  //       return api.subscribe(this.state.categoryIdsSelected, resolve, reject)
  //     }).then(() => {
  //       Actions.success({text: 'Wir werden dich bei der nächsten Gelegenheit benachrichtigen.'})
  //     }).catch((error) => {
  //       console.error("onSubscribe", error)
  //       Actions.error()
  //     })
  // }

  render() {
    return (
        <View style={styles.form}>
            <View style={styles.p}>
                <Text style={[styles.formTextTop, styles.center]}>Benachrichtige mich für</Text>
            </View>
            <View style={styles.buttonGroup}>
              <RadioButtonGroup 
                  options={this.props.categoriesPossible}
                  value={this.props.categoryIdsSelected}
                  onChange={categoryIdsSelected => this.props.setCategoriesSelected(categoryIdsSelected)} />
            </View>
            <View style={styles.p}>
                <Text style={[styles.formText, styles.center]}>via Push-Benachrichtigung</Text>
            </View>
            <View style={styles.buttonGroup}>
                <Button 
                    title="Abonnieren" 
                    style={styles.buttonPrimary} 
                    onPress={() => this.props.doSubscribe()} />
            </View>
        </View>
    )
  }
}


const mapStateToProps = state => {
  return {
    categoryIdsSelected: state.subscriptions,
    categoriesPossible: state.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCategoriesSelected: (categoryIdsSelected) => dispatch(setSubscriptions(categoryIdsSelected, false)),
    doSubscribe: () => dispatch(doSubscribe()),
  }
}

const InitSceneReduxed = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitScene)

export default InitSceneReduxed