/* @flow */

import React, {Component} from 'react'

import fold from './'

const enhance = fold({
  props: lift => <T>(props: T) => lift({a: 1}),
})

declare class X extends Component<{x: 1}> {}

export default class App extends enhance<{y: 1}, *>(Component) {
  render = () => {
    console.log(this.props)

    const z = this.props.test.z

    return <div>test</div>
  }
}

const X = (props: {a: 1}) => <div />

const Test = () => (
  <App />
)
l
