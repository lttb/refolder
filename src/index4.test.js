/* @flow */

import React, {Component} from 'react'

import fold from './index4'

class State extends Component<{state: {}, context: {}, children: Function}, {}> {
  state = this.props.state || {}
  setState = this.setState.bind(this)
  link = {
    state: this.state,
    setState: this.setState,
  }

  constructor(...args) {
    super(...args)

    if (this.props.context) this.initState(this.props.context)
  }

  initState(self) {
    self.state = this.state
    self.setState = this.setState
  }

  render() {
    return this.props.children({
      state: this.state,
      setState: this.setState,
    })
  }
}

const enhance = fold(
  _ => class $0<T, S> extends _<T> {
    self: {...$Exact<S>}
  },
  _ =>
    class $1<T, Self> extends _<{...T, x: 1}, Self & {lol: 'kek'}> {
      constructor(...args) {
        super(...args)

        console.log(super.self)

        console.log('init', 1, super.props)
      }

      onClick() {
        console.log('click', 1, super.props)
      }

      lift(lift) {
        console.log('lift', 1, super.props)

        return lift({...super.props, a: 1})
      }
    },

  _ =>
    class $2<T> extends _<{...T, z: 2}, {|setState: Function|}> {
      constructor(...args) {
        super(...args)

        console.log('init', 2, super.props)
      }

      onClick() {
        console.log('click', 2, super.props)

        super.self.setState(state => ({
          active: !state.active,
        }))

        super.onClick()
      }

      lift(lift) {
        console.log('lift', 2, super.self)

        return (
          <State context={super.self}>
            {({state}) => (
              <div>{lift({...super.props, active: state.active, b: 2})}</div>
            )}
          </State>
        )
      }
    },
)

export default class App extends enhance(Component)<{a: 3}> {
  render() {
    console.log('render', this.props, super.props)

    return (
      <div>
        <button onClick={this.onClick}>click</button>
        <p>props: {JSON.stringify(super.props, null, 4)}</p>
      </div>
    )
  }
}
