/* @flow */

export type Intersection<A, B> = $Diff<
  {...$Exact<A>},
  $Diff<{...$Exact<A>, ...$Exact<B>}, {...$Exact<B>}>
>
export type Diff<A, B> = $Diff<A, Intersection<A, B>>
export type DiffTotal<A, B> = {...$Exact<Diff<A, B>>, ...$Exact<Diff<B, A>>}

// declare function _assert<B, A: B>(): void
// declare export function assert<A, B>(): (
//   $Call<_assert<
//     $Diff<{...A}, $Diff<{...A, ...B}, {...B}>>,
//     {...B}
//   >>
// )

declare function _assert<B, A: B>(): void
declare export function assert<A, B>(): (
  $Call<_assert<
    $Diff<
      {...$Exact<A>},
      $Diff<{...$Exact<A>, ...$Exact<B>}, {...$Exact<B>}>
    >,
    {...$Exact<B>}
  >>
)

declare export function assert2<A, B>(A, B): (
  $Call<_assert<
    $Diff<{...$Exact<A>}, $Diff<{...$Exact<A>, ...$Exact<B>}, {...$Exact<B>}>>,
    {...$Exact<B>}
  >>
)

declare export class O<Enhance, Base, S = any> {
  props: {|...Enhance|};
  self: S;
  $props: {|...Base|};
  static lift: ({|...Base|}) => Node;
}

declare export class O2<Total> {
 $$props: {|...$Exact<Total>|};
}

/* eslint-disable no-redeclare */

export type $Props<T> = $Call<
  & (<V>(V) => {|...$Exact<$PropertyType<V, '$props'>>|})
  & (<V>(V) => {||})
, T>

export type $$Props<T> = $Call<
  & (<V>(V) => {|...$Exact<$PropertyType<V, '$$props'>>|})
  & (<V>(V) => {||})
, T>

// export const of = <T, Enhance, Fn>(_: *, cb: ?(({...$Props<T>}, Enhance) => void)): $Supertype<
//   & Class<
//     // O2<
//     //   // {...$Exact<$PropertyType<T, '$$props'>>, ...$Exact<{...$Props<T>, ...$Exact<Enhance>}>},
//     //   // $Exact<{...$Exact<DiffTotal<$Props<T>, $Exact<{...$Props<T>, ...$Exact<Enhance>}>>>, ...__Props<T>}>,
//     //   $Call<
//     //     & (<V>(V) => {|...$Exact<$PropertyType<V, '$$props'>>|})
//     //     & (<V>(V) => {||})
//     //   , T> & $Props<T>,
//     //   // $Exact<{
//     //   //   ...$Props<T>,
//     //   //   // ...$Exact<DiffTotal<$Props<T>, $Exact<{...$Props<T>, ...$Exact<Enhance>}>>>,
//     //   //   ...$Call<
//     //   //     & (<V>(V) => {|...$Exact<$PropertyType<V, '$$props'>>|})
//     //   //     & (<V>(V) => {||})
//     //   //   , T>,
//     //   // }>,
//     // >
//     & O<
//       $Exact<{...$Props<T>, ...$Exact<Enhance>}>,
//       $Exact<$Call<Fn, {|...$Props<T>, ...$Exact<Enhance>|}>>,
//     > & T
//   >
// > => {
//   return class extends _ {props: any; $props: any; $$props: any; static lift: any;}
// }

class O4<T, Enhance> {
  $$props: $Exact<{...$Exact<DiffTotal<$Props<T>, $Exact<{...$Props<T>, ...$Exact<Enhance>}>>>, ...$$Props<T>}>;
}

class O3<T, Int, Enhance: Int, Base> {
  props: {|...$Exact<{...$Props<T>, ...$Exact<Enhance>}>|};
  $props: {|...Base|};
  static lift: ({|...Base|}) => Node;
}

class O5<T: void> {}

// export const of = <T, Enhance, Fn>(_: *, cb: ?(({...$Props<T>}, Enhance) => void)): $Supertype<
//   & Class<
//     & O4<T, Enhance> & O3<
//       T,
//       Enhance,
//       $Exact<$Call<Fn, {|...$Props<T>, ...$Exact<Enhance>|}>>,
//     > & T
//   >
// > => {
//   return class extends _ {props: any; $props: any; $$props: any; static lift: any;}
// }

declare export function of<T, Enhance, Fn>(mixed, any): $Supertype<
  & Class<
    & O5<$Call<() => void>> & O4<T, Enhance> & O3<
      T,
      Intersection<$Props<T>, Enhance>,
      Enhance,
      $Exact<$Call<Fn, {|...$Props<T>, ...$Exact<Enhance>|}>>,
    > & T
  >
>

declare function merge<A: {}>(A): {|
  ...$Exact<A>,
|}
declare function merge<A: {}, B: {}>(A, B): {|
  ...$Exact<A>,
  ...$Exact<B>
|}
declare function merge<A: {}, B: {}, C: {}>(A, B, C): {|
  ...$Exact<A>,
  ...$Exact<B>,
  ...$Exact<C>
|}
declare function merge<A: {}, B: {}, C: {}, D: {}>(A, B, C, D): {|
  ...$Exact<A>,
  ...$Exact<B>,
  ...$Exact<C>,
  ...$Exact<D>
|}

export function merge(...args) {
  return args.reduce((acc, value) => Object.assign(acc, value), {})
}
