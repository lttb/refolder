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

declare class O<Enhance, Base, S = any> {
  props: {|...Enhance|};
  self: S;
  $props: {|...Base|};
  static lift: ({|...Base|}) => Node;
}

declare class O2<Total> {
  $$props: {|...$Exact<Total>, x: 1|};
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

const of = <T, Enhance, Fn>(_): $Supertype<
  & Class<
    O2<
      __Props<T>,
      // $Exact<{...$Exact<DiffTotal<$Props<T>, {...$Props<T>, ...$Exact<Enhance>}>>, ...__Props<T>}>,
    > & O<
      $Exact<{...$Props<T>, ...$Exact<Enhance>}>,
      $Exact<$Call<Fn, {|...$Props<T>, ...$Exact<Enhance>|}>>,
      // $Exact<{...$Exact<DiffTotal<$Props<T>, {...$Props<T>, ...$Exact<Enhance>}>>, ...__Props<T>}>,
      // $Exact<{...$Exact<DiffTotal<$Props<Class<T>>, Enhance>>, ...__Props<Class<T>>}>
    > & T
  >
> => class extends _ {props: any; $props: any; $$props: any; static lift: any;}



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

// const tst = <T, From>(): {...$Exact<DiffTotal<$Props<T>, From>>, ...__Props<T>} => {
//   declare var res: __Props<T>
//
//   return res
// }

declare function tst<T, From>(): {...$Exact<DiffTotal<$Props<T>, From>>, ...__Props<T>}

const enhance = fold(
  (_) => {
    type N = null

    return class $ extends of<
      _,
      {wow: boolean},
      <Props>(Props) => {...Props, a1: number, a3: string}
    >(_) {
      onClick(): void {
        console.log('click', 1, super.props, super.$props, super.$$props)
      }

      lift() {
        return $.lift(merge(super.props, {a1: 1, a3: 'x'}))
      }
    }
  },

  (_) => {
    type N = null

    return class $ extends of<
      _,
      {a1: number, y: string, heh: string},
      <Props>(Props) => {...Props, a2: string, y: number}
    >(_) {
      onClick(): void {
        console.log('click', 2, super.props, super.$$props, super.$props)

        super.onClick()
      }

      lift() {
        return $.lift(merge(super.props, {a2: 'test', y: 1}))
      }
    }
  },
)

const _ = enhance(class extends Component<{}> {
  $$props: {y: 1}
})

class App extends _ {
  render() {
    console.log(super.props)
  }
}

export default ((App: any): ComponentType<__Props<_>>)

// type Props = $Props<_>
// type From = {|...Props, x: string|}
//
// type __ = {...$Exact<DiffTotal<Props, From>>, ...__Props<_>}
//
// (assert<Props, From>())
//
// class App extends of<*, From, From, __>(_) {
//   render() {
//     console.log('render', this.props, super.props, super.$props, super.$$props)
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
// export default ((App: any): ComponentType<__Props<_>>)

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
