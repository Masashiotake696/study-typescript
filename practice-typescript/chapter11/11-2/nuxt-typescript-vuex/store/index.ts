import { S } from './type'
import { StoreContext } from 'vuex'

export const state = (): S => ({
  count: 0
})

export const actions = {
  nuxtServerInit({ state, rootState, getters, rootGetters }: StoreContext) {
    console.log(state.counter.nest.count)
    console.log(rootState.counter.nest.count)
    console.log(getters['counter/nest/double'])
    console.log(rootGetters['counter/nest/double'])
  }
}
