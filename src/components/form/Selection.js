import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../../styles'

export default class Selection extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={[styles.radioButtonGroupItem, this.props.checked && styles.radioButtonGroupItemActive]}>
            <Text style={[styles.radioButtonGroupItemText, this.props.checked && styles.radioButtonGroupItemTextActive]}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}