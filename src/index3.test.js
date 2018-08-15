/* @flow */

import React, {Component} from 'react'

import fold, {$React$Component} from './'

const enhance = fold(
  _ => class extends _ {
    props = lift => (props: {hoh: 'x'}) => lift({...props, a: 1, heh: props.hoh})
  },
  _ => class extends _ {
    onClick() {
      super.onClick();

      console.log('x')
    }

    toggle() {
      this.onClick()
    }
  },
  _ => class extends _ {
    props = lift => props => lift({...props, c: 'hehe'})
  },
)

const enhance = fold(
  {
    props: lift => (props: {hoh: 'x'}) => lift({...props, a: 1, heh: props.hoh}),
  },
  ctx => ({
    onClick: () => null,
    props: lift => props => lift({...props, b: 'haha'}),
  }),
  ctx => ({
    toggle: () => ctx.onClick(),
    props: lift => props => lift({...props, c: 'hehe'}),
  }),
  {
    click: () => console.log('click'),
    props: lift => props => lift({...props, a: 1, heh: props.hoh}),
  },
)

const enhance2 = fold(
  {
    props: lift => (props: {hoh: 'x'}) => lift({...props, a: 1, heh: props.hoh}),
  },
  ctx => ({
    onClick: () => null,
    props: lift => props => lift({...props, b: 'haha'}),
  }),
)

class App extends enhance(Component) {
  onKek = () => null

  render() {
    this.$.click()

    return <div />
  }
}

type $X<T> = $Diff<T, {}>

declare var t: $Diff<App, {}>

class App2 extends enhance<$X<App>>(App) {
  render() {
    this.$.onKek()

    this.$.click()

    return <div />
  }
}

// class App extends enhance(Component) {
//   of(fn) {
//     return fn.bind(this.$)
//   }
// }

// const of = <T>(C) => class extends C {
//   of(fn) {
//     declare var x: T
//
//     return fn.bind(x)
//   }
// }
//
// const X = enhance(Component)
// const X2 = enhance2(Component)
//
// declare var x: $PropertyType<X, '$'>
//
// class App2 extends of<$PropertyType<X, '$'>>(X) {
//   render = this.of(function () {
//     console.log(this.props)
//   })
// }
//
// class App3 extends of<$PropertyType<X2, '$'>>(X2) {
//   render = this.of(function () {
//     console.log(this.props)
//   })
// }


export default enhance.of(App)

const Enhanced = enhance.of(App)

const Test = () => (
  <Enhanced lol="lol" />
)

const X = (props: {a: 1}) => <div />
