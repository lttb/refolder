/* @flow */

import {type $Props, type $$Props, type DiffTotal, type Intersection} from './helpers'

export class O4<T, Enhance> {
  $$props: $Exact<{
    ...$Exact<DiffTotal<$Props<T>, $Exact<{...$Props<T>, ...$Exact<Enhance>}>>>,
    ...$$Props<T>
  }>;
}

export class O3<T, Int, Enhance: Int, Base> {
  props: {|...$Exact<{...$Props<T>, ...$Exact<Enhance>}>|};
  $props: {|...Base|};
  static lift: ({|...Base|}) => Node;
}

// type Extended<T, Enhance, Base> = $Supertype<
//   & Class<
//     & O4<T, Enhance> & O3<
//       T,
//       Intersection<$Props<T>, Enhance>,
//       Enhance,
//       $Exact<{...$Props<T>, ...$Exact<Enhance>, ...$Exact<Base>}>
//     > & T
//   >
// >

declare class O1 {}

export type Extended<T, Enhance, Base, O = O1, V = *, Props = *> = $Supertype<
  & Class<
    & O & O4<T, Enhance> & O3<
      T,
      Intersection<$Props<T>, Enhance>,
      Enhance,
      $Exact<$Call<(
        & ((V: Function, Props) => $Call<Base, Props>)
        & ((V, Props) => {...Props, ...$Exact<V>})
      ), Base, {|...$Props<T>, ...$Exact<Enhance>|}>>
    > & T
  >
>

/* ::
export type Enhance = {lol: 'lol', a4: string}
export type Base = {kek: 'kek'}
*/

declare export function folder<T>(Class<T>): Extended<T, Enhance, Base>
