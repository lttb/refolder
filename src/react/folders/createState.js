import React from 'react'

class State extends React.Component {
  constructor(props) {
    super(props)

    const {provider} = this.props

    this.provider = provider
    this.state = provider.state

    provider.setState = (v) => {
      this.setState(v)
    }
  }

  render() {
    this.provider.state = this.state

    return this.props.children()
  }
}

const Restate = (state = {}, prvdr) => {
  const x = prvdr || provider

  function provider(children) {
    return <State provider={x}>{children}</State>
  }

  x.state = state

  return provider
}

const createState = (fn, state) => (self) => {
  const restate = Restate(state, self)

  const result = fn(self)
  const render = result.render || result

  return {
    ...result,
    render(lift) {
      return restate(() => render(lift))
    },
  }
}

export default createState
