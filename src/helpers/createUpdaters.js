import {assign, create} from './utils'

const CACHE = Symbol('cache')

function next(p, _p) {
  const prevProps = this.value.props

  this.value.props = p
  this.value._props = _p

  const shouldRender =
    this.value.shouldUpdate && !!this.value[CACHE] ? this.value.shouldUpdate(prevProps) : true

  if (shouldRender) {
    this.value[CACHE] = this.render(this.updater)
  }

  return this.value[CACHE]
}

const createUpdaters = (queue, BASE_RENDER) => {
  const updaters = []

  for (let i = 0; i < queue.length; i++) {
    const folder = queue[i]
    const {id} = folder

    const props = create(null)
    const _props = create(null)

    const value = assign(create(null), {props, _props})

    if (id) {
      value.toString = () => id
    }

    const f = folder(value)

    let render
    let shouldUpdate

    if (typeof f === 'function') {
      render = f
    } else {
      ({render, shouldUpdate} = f)
    }

    value.shouldUpdate = shouldUpdate

    if (!render) {
      render = lift => lift(value)
    }

    const updater = (p, _p) => {
      const _nextP = _p ? assign({[id]: _p}, value._props) : value._props

      assign(p, _nextP)

      return updaters[i + 1].next(p, _nextP)
    }

    updaters.push({
      next,
      updater,
      render,
      value,
    })
  }

  updaters.push({
    next(props, _props) {
      return BASE_RENDER(props, _props)
    },
  })

  return updaters
}

export default createUpdaters
