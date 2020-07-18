// State
export interface S {
  count: number
}

// Getters
export interface G {
  double: number
  expo2: number
  expo: (amount: number) => number
}

// Root Getters
export interface RG {
  'counter/double': G['double']
  'counter/expo2': G['expo2']
  'counter/expo': G['expo']
}

// Mutations
export interface M {
  setCount: { amount: number }
  multi: number
  increment: void
  decrement: void
}

// Root Mutations
export interface RM {
  'counter/setCount': M['setCount']
  'counter/multi': M['multi']
  'counter/increment': M['increment']
  'counter/decrement': M['decrement']
}

// Actions
export interface A {
  asyncSetCount: { amount: number }
  asyncMulti: number
  asyncIncrement: void
  asyncDecrement: void
}

// Root Actions
export interface RA {
  'counter/asyncSetCount': A['asyncSetCount']
  'counter/asyncMulti': A['asyncMulti']
  'counter/asyncIncrement': A['asyncMulti']
  'counter/asyncDecrement': A['asyncDecrement']
}
