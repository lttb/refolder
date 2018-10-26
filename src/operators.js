export const OPERATOR = Symbol('operator')

const createOperator = provider => folder => (self) => {
  const fn = folder(self)
  const render = fn.render || fn

  let _fn

  const update = (lift) => {
    _fn = _fn || provider(self, lift)

    return render(_fn)
  }

  return Object.assign(typeof fn === 'function' ? update : {...fn, render: update}, {
    [OPERATOR]: true,
  })
}

export const protect = (provider, id = Symbol('id')) => {
  const operator = createOperator((self, lift) => data => lift(self.props, data))(provider)

  return Object.assign(operator, {
    id,
    toString() {
      return id
    },
  })
}

export const replace = createOperator((self, lift) => data => lift(data))

export const merge = createOperator((self, lift) => data => lift({...self.props, ...data}))
