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
  'counter/nest/double': G['double']
  'counter/nest/expo2': G['expo2']
  'counter/nest/expo': G['expo']
}
