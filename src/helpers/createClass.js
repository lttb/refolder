import {assign, getDisplayName} from './utils'

const createClass = (Base, options) => {
  const fuck = (props) => {
    const nextProps = assign({}, props, props._private)
    delete nextProps._private

    return nextProps
  }

  class Folded extends Base {
    constructor(props) {
      const nextProps = fuck(props)

      super(nextProps)

      this.nextProps = nextProps
      this.props = props

      setImmediate(() => {
        this.props = nextProps
      })
    }

    render() {
      this.props = fuck(this.props)
      return super.render()
    }
  }

  if (Base.getDerivedStateFromProps) {
    Folded.getDerivedStateFromProps = (props, state) =>
      Base.getDerivedStateFromProps(fuck(props), state)
  }

  Folded.displayName = `fold(${getDisplayName(Base)})`

  return (props, privateProps) => {
    props._private = privateProps

    return options.createElement(Folded, props, props.children)
  }
}

export default createClass
