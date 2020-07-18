import { Getters, Mutations, Actions } from './types'
import { State, IGetters, IMutations, IActions } from './counterType'

const state: State = {
  count: 0
}

const getters: Getters<State, IGetters> = {
  double(state) {
    return state.count * 2
  },
  expo2(state) {
    return state.count ** 2
  },
  expo(state) {
    return amount => state.count ** amount
  }
}

const mutations: Mutations<State, IMutations> = {
  setCount(state, payload) {
    state.count = payload.amount
  },
  multi(state, payload) {
    state.count = state.count * payload
  },
  increment(state) {
    state.count++
  }
}

const actions: Actions<State, IActions, IGetters, IMutations> = {
  asyncSetCount(ctx, payload) {
    ctx.commit('setCount', { amount: payload.amount })
  },
  asyncMulti(ctx, payload) {
    ctx.commit('multi', payload)
  },
  asyncIncrement(ctx) {
    ctx.commit('increment')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}