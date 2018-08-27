/* @flow */

import React, {Component, type ComponentType, type Node} from 'react'

import fold, {finalize} from './index4.js.flow'

type Intersection<A, B> = $Diff<{...$Exact<A>}, $Diff<{...$Exact<A>, ...$Exact<B>}, {...$Exact<B>}>>
type Diff<A, B> = $Diff<A, Intersection<A, B>>
type DiffTotal<A, B> = {...$Exact<Diff<A, B>>, ...$Exact<Diff<B, A>>}

declare function _assert<B, A: B>(): void
declare function assert<A, B>(): (
  $Call<_assert<
    $Diff<{...$Exact<A>}, $Diff<{...$Exact<A>, ...$Exact<B>}, {...$Exact<B>}>>,
    {...$Exact<B>}
  >>
)

declare class O<Enhance, Base, Total, S = any> {
  props: {|...Enhance|};
  self: S;
  $props: {|...Base|};
  $$props: {|...Total|};
  static lift: ({|...Base|}) => Node;
}

/* eslint-disable no-redeclare */

declare function p<T>(T): {|...$PropertyType<T, '$props'>|}
declare function p<T>(T): {}

declare function __p<T>(T): {|...$PropertyType<T, '$$props'>|}
declare function __p<T>(T): {}

type _p<T> = $Call<typeof p, T>

type $Props<T> = $Call<
  & (<V>(V) => {|...$Exact<$PropertyType<V, '$props'>>|})
  & (<V>(V) => {||})
, T>
type __Props<T> = $Call<
  & (<V>(V) => {|...$Exact<$PropertyType<V, '$$props'>>|})
  & (<V>(V) => {||})
, T>

const of = <T: *, Enhance, Base, Total>(
  _: Class<T>,
): $Supertype<
  & Class<
    O<
      $Exact<Enhance>,
      $Exact<Base>,
      $Exact<Total>,
      // $Exact<{...$Exact<DiffTotal<$Props<Class<T>>, Enhance>>, ...__Props<Class<T>>}>,
    > & T
  >
> => class extends _ {props: any; $props: any; static lift: any; $$props: any}



// const merge = <A: {}, B: {}>(a: A, b: B): {|...$Exact<A>, ...$Exact<B>|} =>

declare function merge<A: {}, B: {}>(A, B): {|
  ...$Exact<A>,
  ...$Exact<B>
|}
declare function merge<A: {}, B: {}, C: {}>(A, B, C): {|
  ...$Exact<A>,
  ...$Exact<B>,
  ...$Exact<C>
|}
declare function merge<A: {}, B: {}, C: {}, D: {}>(A, B, C, D): {|
  ...$Exact<A>,
  ...$Exact<B>,
  ...$Exact<C>,
  ...$Exact<D>
|}

function merge(...args) {
  return args.reduce((acc, value) => Object.assign(acc, value), {})
}

const enhance = fold(
  (_) => {
    type Props = $Props<_>
    type From = {|...Props, wow: boolean|}
    type To = {|...From, a1: number, a3: string|}

    type __ = {...$Exact<DiffTotal<Props, From>>, ...__Props<_>}

    (assert<Props, From>())

    return class $ extends of<*, From, To, __>(_) {
      constructor(...args) {
        super(...args)

        console.log('init', 1, this.props, super.props)
      }

      onClick(): void {
        console.log('click', 1, super.props, super.$props, super.$$props)
      }

      lift() {
        return $.lift(merge(super.props, {a1: 1, a3: 'x'}))
      }
    }
  },

  (_) => {
    type Props = $Props<_>
    type From = {|...Props, a1: number, y: string, heh: string|}
    type To = {|...From, a2: string, y: number|}

    type __ = {...$Exact<DiffTotal<Props, From>>, ...__Props<_>}

    (assert<Props, From>())

    return class $ extends of<*, From, To, __>(_) {
      constructor(...args) {
        super(...args)

        console.log('init', 2, this.props, super.props, super.$props, super.$$props)
      }

      onClick(): void {
        super.onClick()
      }

      lift() {
        const {heh, ...rest} = super.props

        return $.lift(merge(super.props, {a2: 'test', y: 1}))
      }
    }
  },

  (_) => {
    type Props = $Props<_>
    type From = {|...Props, a2: string, y: number|}
    type To = {|...From, a3: number, y: boolean, x: string|}

    type __ = {...$Exact<DiffTotal<Props, From>>, ...__Props<_>}

    (assert<Props, From>())

    return class $ extends of<*, From, To, __>(_) {
      constructor(...args) {
        super(...args)

        console.log('init', 2, this.props, super.props, super.$$props)
      }

      onClick(): void {
        super.onClick()
      }

      lift() {
        console.log(this)

        return $.lift(merge(super.props, {a3: 2, y: true, x: 'test'}))
      }
    }
  },
)

const _ = enhance(class extends Component<{}> {})

type Props = $Props<_>
type From = {|...Props, x: string|}

type __ = {...$Exact<DiffTotal<Props, From>>, ...__Props<_>}

(assert<Props, From>())

class App extends of<*, From, From, __>(_) {
  render() {
    console.log('render', this.props, super.props, super.$props, super.$$props)

    return (
      <div>
        <button onClick={this.onClick}>click</button>
        <p>props: {JSON.stringify(super.props, null, 4)}</p>
      </div>
    )
  }
}

export default ((App: any): ComponentType<__Props<_>>)

// class App extends enhance<{x: 1}, *, *>(Component) {
//   render() {
//     console.log('render', this.props, super.props)
//
//     return (
//       <div>
//         <button onClick={this.onClick}>click</button>
//         <p>props: {JSON.stringify(super.props, null, 4)}</p>
//       </div>
//     )
//   }
// }


//
// const enhance2 = fold(
//   (_) => {
//     type Props = $Props<_>
//     type From = {|wow2: boolean|}
//     type To = {|a12: number, a32: number|}
//
//     (assert<Props, From>())
//
//     return class $ extends of<*, From, To>(_) {
//       constructor(...args) {
//         super(...args)
//
//         console.log('init', 1, this.props, super.props)
//       }
//
//       onClick(): void {
//         console.log('click', 1, super.props)
//       }
//
//       lift() {
//         console.log(this)
//
//         return $.lift({a12: 1, a32: 2})
//       }
//     }
//   },
//
//   (_) => {
//     type Props = $Props<_>
//     type From = {|...Props, a1: number, y: string|}
//     type To = {|...From, a2: boolean, y: number|}
//
//     (assert<Props, From>())
//
//     return class $ extends of<*, From, To>(_) {
//       constructor(...args) {
//         super(...args)
//
//         console.log('init', 2, this.props, super.props)
//       }
//
//       onClick(): void {
//         super.onClick()
//       }
//
//       lift() {
//         return $.lift(merge(super.props, {a2: true, y: 1}))
//       }
//     }
//   },
//
//   (_) => {
//     type Props = $Props<_>
//     type From = {|a2: boolean, x: number|}
//     type To = {|...From, a22: string|}
//
//     (assert<Props, From>())
//
//     return class $ extends of<*, From, To>(_) {
//       constructor(...args) {
//         super(...args)
//
//         console.log('init', 2, this.props, super.props)
//       }
//
//       onClick(): void {
//         super.onClick()
//       }
//
//       lift() {
//         console.log(this)
//
//         return $.lift(merge(super.props, {a22: 'x'}))
//       }
//     }
//   },
// )
//
// class App2 extends enhance2(class extends Component<{a: 1}> {}) {
//   render() {
//     console.log('render', this.props, super.props)
//
//     return (
//       <div>
//         <button onClick={this.onClick}>click</button>
//         <p>props: {JSON.stringify(super.props, null, 4)}</p>
//       </div>
//     )
//   }
// }
