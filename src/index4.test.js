/* @flow */

import React, {Component, type ComponentType} from 'react'

import fold from './index4'

class State extends Component<{state?: {}, context?: {state: any, setState: Function}, children: Function}, {}> {
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

type Merge<A, B> = $ObjMap<{...$Exact<A>, ...$Exact<B>}, <V>(V) => V>

class Test<P> extends Component<P> {}

type Guard<T> = Class<Component<T>>

const enhance = fold(
  (_) => {
    // ;(class extends _<Base> {}: Guard<$Subtype<{x: string, z: string}>>)

    type Base = {a1: number}
    type Enhance = {wow: boolean}

    return class $<T: {}> extends _<{...$Exact<T>}> {
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

        return lift({...super.props, a1: 1})
      }
    }
  },

  (_) => {
    // ;(class extends _<Base> {}: Guard<$Subtype<{x: string, z: string}>>)

    type Base = {a2: string}
    type Enhance = {x: string, y: string}

    return class $<T: {}> extends _<{...$Exact<T>}> {
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
        console.log('lift', 2, super.props.a)

        return (
          <State state={{active: false}}>
            {({state}) => (
              <div>{
                lift({
                  ...super.props,
                  a2: 'test',
                })}
              </div>
            )}
          </State>
        )
      }
    }
  },
)


class App extends enhance(Component)<{z: 1}> {
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

export default ((App: any): ComponentType<{aa: 1}>)
