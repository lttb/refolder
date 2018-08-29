/* @flow */

/* eslint-disable
  flowtype/space-before-type-colon,
  no-redeclare,
  class-methods-use-this,
  arrow-parens,
  operator-linebreak
*/

declare var fold: $ComposeReverse

declare class E {
  heh(number): null
}

const mix = (_) => class extends _ {}

type mixin<I = interface {}> = <A: *>(Class<A>) => Class<I & $Supertype<A>>

const withSmth
  : mixin<interface {onClick(number): boolean}>
  = _ => class extends _ {
    onClick(a) {
      return false
    }
  }

const withSmth2
  : mixin<interface {onClick2(number): number}>
  = _ => class extends _ {
    onClick2(a) {
      super.onClick(a)

      super.fucker()

      super.onClick(1)
      // super.onClick('x')

      // super.heh(true)

      return 1
    }
  }


const enhance = fold(withSmth, withSmth2)

const C = class extends enhance(class {}) {
  lol() {
    // super.heh(true)

    super.onClick2(1)
  }
}

const c = new C()

c.onClick
c.lol
