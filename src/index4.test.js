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

class O<Enhance, Base, S = any> {
  props: {|...Enhance|};
  self: S;
  $props: {|...Base|};
}

const of = <T: *, Enhance, Base>(
  _: Class<T>
): $Supertype<
  & Class<O<$Exact<Enhance>, $Exact<Base>>
  & T
>> => class extends _ {props: any; $props: any}

// const _of = (<T: *>() => <P>(_: Class<*>) => of<P, *>(_))()

const enhance = fold(
  (_) => {
    // ;(class extends _<Base> {}: Guard<$Subtype<{x: string, z: string}>>)

    type Base = {a1: number}
    type Enhance = {wow: boolean}

    return class $1 extends of<*, Enhance, Base>(_) {
      constructor(...args) {
        super(...args)

        console.log(super.self)

        console.log('init', 1, this.props, super.props)
      }

      onClick(): void {
        console.log('click', 1, super.props)
      }

      lift(lift) {
        console.log('lift', 1, super.props)

        return lift({...super.props, a1: 1})
      }
    }
  },

  (_) => {

    type Base = {|a2: string|}
    type Enhance = {|...$PropertyType<_, '$props'>, a1: string, y: string|}

    declare var x: $Subtype<$PropertyType<_, '$props'>>
    declare var z: $Subtype<$PropertyType<_, 'props'>>
    declare var y: Enhance

    // ;(class extends _ {}: Guard<$Subtype<Enhance>>)

    // ;(y: $Supertype<$PropertyType<_, '$props'>>)

    return class $2 extends of<*, Enhance, Base>(_) {
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

  (_) => {
    type Base = {a3: string}
    type Enhance = {z: number}

    return class $3 extends of<*, Enhance, Base>(_) {
      constructor(...args) {
        super(...args)

        console.log(super.onClick)

        console.log('init', 1, super.$props, super.props, super.lol)
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
