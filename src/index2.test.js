/* @flow */

import React, {Component} from 'react'

import fold from './'

const enhance = fold({
  props: lift => (props: {hoh: 'x'}) => lift({...props, a: 1, heh: props.hoh}),
}, {
  props: lift => props => lift({...props, b: 'haha'}),
})

class App extends enhance(Component) {
  render() {
    console.log(this.props)

    const z = this.props.test.z

    return <div>test</div>
  }
}

export default enhance.of(App)

const Enhanced = enhance.of(App)

const Test = () => (
  <Enhanced lol="lol" />
)

const X = (props: {a: 1}) => <div />
