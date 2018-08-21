/* eslint-disable no-restricted-syntax */

const KEY = Symbol('folders')

const {assign, create} = Object

const LIFT = Symbol('lift')
const UPDATERS = Symbol('updaters')
const VIEW = Symbol('view')
const RENDER = Symbol('render')
const UPDATE = Symbol('update')
const FOLDERS = Symbol('folders')
const PROPS = Symbol('props')

const Fold = options => (...folders) => (
  (Base) => {
    const initial = class extends Base {}
    let temp = initial

    for (const folder of folders) {
      const props = {}

      temp = folder(temp)
      temp.constructor.props = props
    }

    return class extends temp {
      static [KEY] = folders

      constructor(baseProps) {
        super(baseProps)

        this.state = {}
        this.setState = this.setState.bind(this)

        this[UPDATERS] = []

        const queue = []

        if (options.left) {
          queue.push(...folders, ...(Base[KEY] || []))
        } else {
          queue.push(...(Base[KEY] || []), ...folders)
        }

        this[FOLDERS] = []

        const _props = assign(create(null), this.props)

        while (queue.length) {
          const folder = queue.shift()

          if (folder[KEY]) {
            queue.unshift(...folder[KEY])
            continue
          }

          const value = assign(create(null), this, {props: _props})

          this[FOLDERS].push(value)

          const {
            state,
            props,
            componentDidMount,
            shouldComponentUpdate,
            componentDidUpdate,
            componentWillUnmount,
            ...rest
          } = (typeof folder === 'function'
            ? folder(value)
            : folder) || {}

          assign(this.state, state)

          if (props) {
            if (typeof props === 'function') {
              this[UPDATERS].push(props(this[LIFT]))
            } else {
              assign(_props, props)
              this[UPDATERS].push(p => this[LIFT](assign(p, props)))
            }

            value[PROPS] = true

            value.componentDidMount = componentDidMount
            value.shouldComponentUpdate = shouldComponentUpdate
            value.componentDidUpdate = componentDidUpdate
            value.componentWillUnmount = componentWillUnmount
          }

          assign(this, rest)
        }

        this[VIEW] = this[VIEW] || this.render
        this.render = this[UPDATE]
      }

      componentDidMount() {
        for (let i = 0; i < this[FOLDERS].length; i++) {
          if (this[FOLDERS][i].componentDidMount) {
            this[FOLDERS][i].componentDidMount()
          }
        }
      }

      componentWillUnmount() {
        for (let i = 0; i < this[FOLDERS].length; i++) {
          if (this[FOLDERS][i].componentWillUnmount) {
            this[FOLDERS][i].componentWillUnmount()
          }
        }
      }

      [LIFT] = (props) => {
        let ctx
        let prevProps

        if (this[FOLDERS][this._offset]) {
          do {
            ctx = this[FOLDERS][this._offset]

            prevProps = ctx.props
            ctx.props = props

            this._offset++
          } while (ctx[PROPS] !== true)
        }

        this._i++

        const {length: len} = this[UPDATERS]

        if (this._i < len) {
          let shouldUpdate = true
          if (ctx.shouldComponentUpdate) {
            shouldUpdate = ctx.shouldComponentUpdate(prevProps)
          }

          const cached = !!ctx.CACHE

          ctx.CACHE = (!shouldUpdate && ctx.CACHE) ? ctx.CACHE : this[UPDATERS][this._i](props)

          if (cached && ctx.componentDidUpdate) {
            ctx.componentDidUpdate(prevProps)
          }

          return ctx.CACHE
        } else if (this._i > len) {
          if (process.env.NODE_ENV === 'development') {
            throw new Error('It looks like you called `lift` more than once in the handler')
          }

          return null
        }

        return this[RENDER](props)
      };

      [RENDER](props) {
        const prevProps = this.props
        this.props = props
        const result = this[VIEW]()
        this.props = prevProps

        return result
      }

      [UPDATE]() {
        this._i = -1
        this._offset = 0

        return this[LIFT](this.props)
      }
    }
  }
)

export const foldl = Fold({left: true})
export const foldr = Fold({left: false})

export default foldl
