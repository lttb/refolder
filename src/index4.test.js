/* @flow */

import React, {Component, type ComponentType, type Node} from 'react'

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

class Test<P> extends Component<any> {
  $props: P
}

type Guard<T> = Class<Test<T>>

// const cast = <X>(_: Class<X>) => class $<T> extends (class extends _ {props: any}) {props: T}

const c = <X: *>(_: Class<X>) => class extends _ {props: any}

function cast(_) {
  return class $<T> extends (class extends _ {props: any}) {
    props: T
  }
}

class X { props: any }

// const x = <T: *>(_: Class<T>): Class<$Supertype<X> & $Supertype<T>> => class extends _ {prop: any}
// const y = <T: *>(_: Class<T>) => class $<A> extends _ {props: A}
//
// declare function xx<T: *, C: Class<T>>(_: C): $Call<$Call<$Compose, typeof y, typeof x>, C>


class Y<T> extends Component<T> {}

const xx = <T: *>(_: Class<T>): (Class<$Supertype<X & T>>) => class extends _ {prop: any}
const yy = <T: *>(_: Class<T>): $Supertype<T & typeof Y> => class $<A> extends _ {props: A}

declare function xxx<T: *, C: Class<T>>(_: C): $Call<$Call<$Compose, typeof yy, typeof xx>, C>

// const xx = <T: *>(_: Class<T>) => class $<A> extends x(_) {props: A}

declare class O<Enhance, Base, S = any> {
  props: {|...Enhance|};
  self: S;
  $props: {|...Base|};
  static lift: ({|...Base|}) => Node;
}

declare function _assert<B, A: B>(): void
type _ass = typeof _assert

declare function assert<A, B>(): (
  $Call<_assert<$Diff<A, $Diff<{...$Exact<A>, ...$Exact<B>}, B>>, B>>
)

// function assert<A: *, B: *>() {
//   declare var x: B
//
//   ;(x: $Diff<A, $Diff<{...$Exact<A>, ...$Exact<B>}, B>>)
// }

// declare function assert<A, B>(): $Call<
//   & <X: A>() => null
// , $Diff<A, $Diff<{...$Exact<A>, ...$Exact<B>}, B>>>

const of = <T: *, Enhance, Base>(
  _: Class<T>,
): $Supertype<
  & Class<O<$Exact<Enhance>, $Exact<Base>>
  & T
>> => class extends _ {props: any; $props: any; static lift: any}

// const _of = (<T: *>() => <P>(_: Class<*>) => of<P, *>(_))()


const enhance = fold(
  (_) => {
    // ;(class extends _<Base> {}: Guard<$Subtype<{x: string, z: string}>>)

    type From = {wow: boolean}
    type To = {a1: number, a3: number}

    return class $ extends of<*, From, To>(_) {
      constructor(...args) {
        super(...args)

        console.log(super.self)

        console.log('init', 1, this.props, super.props)
      }

      onClick(): void {
        console.log('click', 1, super.props)
      }

      lift() {
        console.log('lift', 1, super.props)

        return $.lift({a1: 1, a3: 2})
      }
    }
  },

  (_) => {
    type From = {a1: number, y: string}
    type To = {a2: string}

    assert<{...$PropertyType<_, '$props'>}, From>()

    return class $ extends of<*, From, To>(_) {
      constructor(...args) {
        super(...args)

        console.log('init', 2, this.props, super.props)
      }

      onClick(): void {
        console.log('click', 2, super.props, super.props.x)

        super.self.setState(state => ({
          active: !state.active,
        }))

        super.onClick()
      }

      lol() {
        console.log(super.props)

        return 'string'
      }

      lift() {
        console.log('lift', 2, super.props.a)

        return (
          <State state={{active: false}}>
            {({state}) => (
              <div>{
                $.lift({
                  a2: 'test',
                })}
              </div>
            )}
          </State>
        )
      }
    }
  },

  (_) => {
    return class $ extends of<*, {z: number}, {a3: string}>(_) {
      constructor(...args) {
        super(...args)

        console.log(super.onClick, super.lift)

        console.log('init', 1, super.$props, super.props, super.lol)

        $.lift({a3: 'z'})
      }
    }
  },
)


class App extends enhance(class extends Component<{a: 1}> {}) {
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
