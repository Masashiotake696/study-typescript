import { Getters } from 'vuex'
import { S, G } from './type'

export const state = (): S => ({
  count: 0
})

export const getters: Getters<S, G> = {
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
