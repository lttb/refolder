/* @flow */

import React, {Component} from 'react'

import fold from './'

const enhance = fold(
  _ => class extends _ {
    // lift = lift => props => lift({...props, a: 1, heh: props.hoh})

    lift(lift) {
      return lift({...this.props, a: 1})
    }

    static onClick() {
      return 'heh'
    }
  },
  _ => class extends _ {
    onClick() {
      _.onClick()

      console.log('x', this.toggle())
    }

    toggle() {
      this.onClick()
    }
  },
  _ => class extends _ {
    shouldComponentUpdate() {
      return this.props.x > 1
    }

    lift(lift) {
      return lift({...this.props, c: 'hehe'})
    }

    static props = lift => props => lift({...props, c: 'hehe'})
  },
)

export default class App extends enhance(class extends Component<{x: 1}> {}) {
  onKek = () => null

  render() {
    console.log(App.onClick())
    console.log(this.onClick)
    console.log(this.props)

    return <div />
  }
}
