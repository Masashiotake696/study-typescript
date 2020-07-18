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
  'todos/nest/double': G['double']
  'todos/nest/expo2': G['expo2']
  'todos/nest/expo': G['expo']
}
