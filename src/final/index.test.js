/* @flow */


/* eslint-disable flowtype/space-before-type-colon */

import React, { Component, type ComponentType } from 'react'

import fold from './'
import { of as by, merge, type $$Props } from './helpers'

import {folder, type Extended} from './folders'

// function folder<A, T: *>(_: Class<T>) {
//   return by<T, {lol: 'lol', a4: number}, {kek: 'kek'}>(_)
// }

// const lolkaFolder = <T: *>(_: Class<T>) => {
//   class $ extends _ {
//     static lolochka(): null {
//       return null
//     }
//   }
//
//   return ($: Extended<_, {kaka: 'ha'}, {lolka: 'da'}, $>)
// }

declare class Lolka {
  static lolochka(): null
}

const lolkaFolder
  : <T: *>(Class<T>) => Extended<T, {kaka: 'ha'}, {lolka: 'da'}, Lolka>
  = _ => class $ extends _ {
    static lolochka(): null {
      return null
    }

    heh() {
      super.hoh()
    }
  }

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

    hoh(): number {
      return 1
    }

    lift() {
      console.log(super.props)

      return $.lift(merge(super.props, { a4: 'test', y: 1 }))
    }
  },

  _ => folder<_>(_),
  _ => lolkaFolder<_>(_),
)

const _ = enhance(class extends Component<{}> {})

class App extends _ {
  render() {
    super.hoh()

    console.log(super.props)
  }
}

export default ((App: any): ComponentType<$$Props<_>>)


const enhance2 = fold(
  _ => class MyClass2 extends by<_,
    {wow: boolean},
    <P>(P) => { ...P, a11: number, a31: string }
  >(_) {
    onClick(): void {
      console.log('click', 1, super.props, super.$props, super.$$props)
    }

    lift() {
      return MyClass2.lift(merge(super.props, { a11: 1, a31: 'x' }))
    }

    hoh(): string {
      return 'heh'
    }
  },

  _ => folder<_>(_),
  _ => lolkaFolder<_>(_),
)

const _2 = enhance2(class extends Component<{}> {})

class App2 extends _2 {
  render() {
    super.onClick()
    App2.lolochka()

    super.hoh()

    console.log(super.props)
  }
}
