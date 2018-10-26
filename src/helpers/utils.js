export const {create, assign} = Object

export const isClassComponent = Component =>
  Boolean(Component && Component.prototype && typeof Component.prototype.render === 'function')

export const getDisplayName = Base =>
  Base.displayName || Base.name || (typeof Base === 'string' && Base.length > 0 ? Base : 'Unknown')
