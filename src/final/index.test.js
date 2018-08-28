/* @flow */

import React, { Component, type ComponentType } from 'react'

import fold from './'
import { of as by, merge, type $$Props } from './helpers'

const enhance = fold(
  _ => class MyClass extends by<_,
    {wow: boolean},
    <P>(P) => { ...P, a1: number, a3: string }
  >(_) {
    onClick(): void {
      console.log('click', 1, super.props, super.$props, super.$$props)
    }

    lift() {
      return MyClass.lift(merge(super.props, { a1: 1, a3: 'x' }))
    }
  },

  _ => class $ extends by<_,
    {a1: string, y: string, heh: string},
    {a2: string, y: number},
  >(_) {
    onClick(): void {
      console.log('click', 2, super.props, super.$props, super.$$props)

      super.onClick()
    }

    lift() {
      return $.lift(merge(super.props, { a2: 'test', y: 1 }))
    }
  },

  _ => class $ extends by<_,
    {y: number, hoh: string},
    {a4: string, y: number }
  >(_) {
    onClick(): void {
      console.log('click', 2, super.props, super.$props, super.$$props)

      super.onClick()
    }

    lift() {
      console.log(super.props)

      return $.lift(merge(super.props, { a4: 'test', y: 1 }))
    }
  },
)

const _ = enhance(class extends Component<{}> {})

class App extends _ {
  render() {
    console.log(super.props)
  }
}

export default ((App: any): ComponentType<$$Props<_>>)
