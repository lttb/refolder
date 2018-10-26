import React, {useState, useEffect} from 'react'

export createState from './createState'

export const commit = (self) => {
  let renderer

  return (lift) => {
    renderer =
      renderer ||
      function Commit() {
        return lift(self.props)
      }

    return React.createElement(renderer)
  }
}

export const observe = source => () => {
  let state
  let setState

  const effect = () => {
    const subscriber = source.subscribe(v => setState(v))

    return () => {
      subscriber.unsubscribe()
    }
  }

  return (lift) => {
    [state, setState] = useState({})
    useEffect(effect)

    return lift(state)
  }
}
