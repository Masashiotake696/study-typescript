export interface State {
  count: number
}

// getters向け、getter関数の戻り型を定義

export interface IGetters {
  double: number
  expo2: number
  expo: (amount: number) => number
}

// mutations向け、mutation関数のpayloadを定義

export interface IMutations {
  setCount: { amount: number }
  multi: number
  increment: void
}

// actions向け、action関数のpayloadを定義

export interface IActions {
  asyncSetCount: { amount: number }
  asyncMulti: number
  asyncIncrement: void
}