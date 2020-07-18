import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

export const state = (): S => ({
  count: 0 // (property) S.count: number
})

export const getters: Getters<S, G> = {
  double(state, getters, rootState, rootGetters) {
    console.log(rootState.counter.nest.count)
    console.log(rootGetters['counter/nest/double'])

    return state.count * 2
  },
  expo2(state) {
    return state.count ** 2
  },
  expo(state) {
    return amount => state.count ** amount
  }
}

export const mutations: Mutations<S, M> = {
  setCount(state, payload) {
    state.count = payload.amount
  },
  multi(state, payload) {
    state.count = state.count * payload
  },
  increment(state) {
    state.count++
  },
  decrement(state) {
    state.count--
  }
}

export const actions: Actions<S, A, G, M> = {
  asyncSetCount({ rootState, rootGetters, commit }, payload) {
    console.log(rootState.counter.nest.count)
    console.log(rootGetters['counter/nest/double'])

    commit('setCount', { amount: payload.amount })
  },
  asyncMulti({ commit }, payload) {
    commit('multi', payload)
  },
  asyncIncrement({ commit }) {
    commit('increment')
  },
  asyncDecrement({ commit }) {
    commit('decrement')
  }
}
