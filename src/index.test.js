// /* @flow */
//
// import React, {Component} from 'react'
//
// import fold from './'
//
// const enhance = fold({
//   props: lift => (props: {hoh: 'x'}) => lift({...props, a: 1, heh: props.hoh}),
// }, {
//   props: lift => props => lift({...props, b: 'haha'}),
// })
//
// export default class App extends enhance<{hoho: 's'}>(Component) {
//   render() {
//     console.log(this.$props)
//     console.log(this.props)
//
//     const z = this.props.test.z
//
//     return <div>test</div>
//   }
// }
//
// const Test = () => (
//   <App />
// )
//
// const X = (props: {a: 1}) => <div />
