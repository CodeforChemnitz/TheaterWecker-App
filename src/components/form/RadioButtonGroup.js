import React, { Component } from 'react'
import { View } from 'react-native'
import Selection from './Selection'
import styles from '../../styles'

export default class RadioButtonGroup extends Component {

  constructor(props) {
    // console.log("RadioButtonGroup props", props)
    super(props)
    this.state = {
      active: this.props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.active !== nextProps.value) {
      this.setState({active: nextProps.value})
    }
  }

  uncheck(id) {
    const index = this.state.active.indexOf(id)
    const active = [
      ...this.state.active.slice(0, index),
      ...this.state.active.slice(index + 1)
    ]
    this.setState({active})
    this.props.onChange(active)
  }

  check(id) {
    const active = [ ...this.state.active, id ]
    this.setState({active})
    this.props.onChange(active)
  }

  render() {
    if (typeof this.props.options === 'undefined') {
      return null
    }
    return (
      <View style={styles.radioButtonGroup}>
        { !!this.props.options && typeof this.props.options.map === 'function' ? this.props.options.map((itm) => {
          // console.log("Cat itm", itm)
          const checked = typeof this.state.active === "object" && this.state.active.indexOf(itm.id) !== -1
          return <Selection
                    key={"k"+itm.id}
                    title={itm.name}
                    checked={checked}
                    onPress={checked ? () => this.uncheck(itm.id) : () => this.check(itm.id)}
                  />
        } ) : null }
      </View>
    )
  }
}