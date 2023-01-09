const KEY = Symbol('folders')

const {assign, create} = Object

const LIFT = Symbol('lift')
const UPDATERS = Symbol('updaters')
const VIEW = Symbol('view')
const RENDER = Symbol('render')
const UPDATE = Symbol('update')
const FOLDERS = Symbol('folders')
const PROPS = Symbol('props')

const Fold = options => (...folders) =>
  assign(
    Base =>
      class extends Base {
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

            const {state, props, ...rest} =
              (typeof folder === 'function'
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
            }

            assign(this, rest)
          }

          this[VIEW] = this[VIEW] || this.render
          this.render = this[UPDATE]
        }

        [LIFT] = (props) => {
          if (this[FOLDERS][this._offset]) {
            let ctx

            do {
              ctx = this[FOLDERS][this._offset]

              ctx.props = props

              this._offset++
            } while (ctx[PROPS] !== true)
          }

          this._i++

          const {length: len} = this[UPDATERS]

          if (this._i < len) {
            return this[UPDATERS][this._i](props)
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
      },
    {[KEY]: folders},
  )

export const foldl = Fold({left: true})
export const foldr = Fold({left: false})

export default foldl
