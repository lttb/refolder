/* @flow */


/* eslint-disable
  flowtype/space-before-type-colon,
  no-redeclare,
  class-methods-use-this,
  arrow-parens,
  operator-linebreak
*/

import React, { Component, type ComponentType } from 'react'

import fold from './'
import { of as by, merge, type $$Props, type Folder } from './helpers'

type mixin<
  Enhance,
  Base = Enhance,
  I = interface {}
> = <A: *>(Class<A>) => Folder<A, Enhance, Base, I>

const withSmth
  : mixin<{a: number}, {d: number}, interface {onClick2(): void}>
  = _ => class extends _ {
    onClick2() {
      return undefined
    }
  }

const enhance = fold(
  _ => class extends by<_, {a: number}, {b: number}>(_) {
    heh(): void {}

    onClick(): void {}
  },
  withSmth,
)

const _ = enhance(class extends Component<{}> {})

class App extends _ {
  render() {
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
  withSmth,
)

const _2 = enhance2(class extends Component<{}> {})

export class App2 extends _2 {
  render() {
    super.onClick()

    console.log(super.props)
  }
}
