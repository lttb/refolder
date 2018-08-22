/* @flow */

import React, {Component, type ComponentType} from 'react'

import fold from './index4'

class State extends Component<{state?: {}, context: {state: any, setState: Function}, children: Function}, {}> {
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

type Merge<A, B> = {...$Exact<A>, ...$Exact<B>}

const enhance = fold(
  _ =>
    class $1<Props: {}, Self> extends _<Merge<Props, {x: 1}> & Props, Self & {lol: 'kek'}> {
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
    class $2<Props: {}, Self = {}> extends _<
      Merge<Props, {x: string, z: number}>,
      Self & {state: {}, setState: Function}
    > {
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

      lift(lift: (Props & {...Props, a: boolean, b: number}) => any) {
        console.log('lift', 2, super.self, super.props.z)

        return (
          <State context={super.self} state={{active: false}}>
            {({state}) => (
              <div>{
                lift({
                  ...super.props,
                  a: true,
                  active: false,
                  b: 2,
                })}
              </div>
            )}
          </State>
        )
      }
    },
)

class Test {
  lift() {
    return 'heh'
  }
}

declare var ska: <F>(...F) => $TupleMap<F, <V>(Class<V>) => V>

const tst = ska(Test)
const tst2 = tst[0]

tst2.lift

console.log(enhance.test)

class App extends enhance(Component)<{|a: 3, x: string|}> {
  render() {
    console.log('render', this.props, super.props, super.self)

    return (
      <div>
        <button onClick={this.onClick}>click</button>
        <p>props: {JSON.stringify(super.props, null, 4)}</p>
      </div>
    )
  }
}

export default ((App: any): ComponentType<{aa: 1}>)
