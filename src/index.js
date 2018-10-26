import {merge, OPERATOR} from './operators'
import {
  assign,
  create,
  isClassComponent,
  getDisplayName,
  createClass,
  createFunction,
  createUpdaters,
} from './helpers'

const KEY = Symbol('folders')

const flatten = (queue) => {
  const result = []

  while (queue.length) {
    const folder = queue.shift()

    if (folder[KEY]) {
      queue.unshift(...folder[KEY])
      continue
    } else {
      result.push(folder)
    }
  }

  return result
}

const Fold = (defaultOptions = {}) => (...folders) =>
  assign(
    (Base, foldOptions = {}) => {
      const options = assign(create(defaultOptions), foldOptions)

      const BASE_RENDER = isClassComponent(Base)
        ? createClass(Base, options)
        : createFunction(Base, options)

      const queue = flatten(folders.concat(Base[KEY] || []))

      const updaters = createUpdaters(queue, BASE_RENDER)

      const Folder = props => updaters[0].next(assign(create(null), props), {})

      Folder[KEY] = folders
      Folder.displayName = getDisplayName(Base)

      return Folder
    },
    {[KEY]: folders},
  )

export * from './operators'

export const fold = Fold()

export default (...args) => fold(...args.map(fn => (fn[OPERATOR] ? fn : merge(fn))))
