/* @flow */


/* eslint-disable flowtype/space-before-type-colon, no-redeclare, class-methods-use-this, arrow-parens */

import React, { Component, type ComponentType } from 'react'

import fold from './'
import { of as by, merge, type $$Props } from './helpers'

import {type Folder} from './folders'


const withSmth = <T: *>(_: Class<T>): Folder<T, {a: number}, {b: number}> => {
  return class $ extends _ {
    onClick(): void {}
  }
}

interface I2 {
  onClick2(): void
}

// const withSmth2
//   : <T: *>(_: Class<T>) => Folder<T, {e: number, b: number}, {c: string}, Smth2>
//   = _ => class extends _ {
//     onClick2() { return 'x' }
//   }

// function withSmth2<T: *>(_: Class<T>): Folder<T, {e: number, b: number}, {c: string}, I> {
//   return class $ extends _ implements I {
//     onClick2() { return undefined }
//   }
// }

const withSmth2 = <T: *>(_: Class<T>): Folder<T, {e: number, b: number}, {c: string}, {
  onClick3(): void
}> => class $ extends _ {
  onClick2() { return 'undefined' }
}

const enhance = fold(
  _ => class extends by<_, {a: number}, {b: number}>(_) {
    heh(): void {}
    onClick(): void {}
  },
  withSmth2,
)

const _ = enhance(class extends Component<{}> {})

class App extends _ {
  render() {
    super.onClick()
    super.onClick2()

    console.log(super.props)
  }
}

export default ((App: any): ComponentType<$$Props<_>>)



/**
 *
 *
 *
 */

const enhance2 = fold(
  _ => class extends by<_, {a1: number}, {b1: number}>(_) {
    heh(): void {}
    onClick(): void {}
  },
  withSmth2,
)

const _2 = enhance2(class extends Component<{}> {})

export class App2 extends _2 {
  render() {
    super.onClick()
    super.onClick2()

    console.log(super.props)
  }
}
