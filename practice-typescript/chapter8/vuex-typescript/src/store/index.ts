import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0 as number | null,
    name: null as string | null
  },
  getters: {
    getName(state, getters) { // (parameter) state: { count: number | null; name: string; }
      return state.name
    },
    greet(state, getters) {
      return `My name is ${getters.getName.toUpperCase()}` // Error（getters.getNameがnullの場合ランタイムエラー）
    }
  },
  mutations: {
    setName(state, payload) { // (parameter) state: { count: number | null; name: string; }
      state.name = payload
    },
    increment(state) {
      // state.count++ // Error
    }
  },
  actions: {
    asyncSetName(ctx, payload: string) { // var state: { count: number | null; name: string; }
      ctx.commit('setName', { name: payload }) // Error（payloadをstring型でダウンキャストしても実行側はアノテーションに関与しないため、実際はstring型じゃない場合がある）
      console.log(ctx.state.name) // (property) name: string | null
    },
    asyncIncrement(ctx) {
      ctx.commit('increment')
      console.log(ctx.state.count) // (property) count: number | null
    },
    async countup(ctx) {
      while(true) {
        await (() => new Promise(resolve => {
          setTimeout(resolve, 1000)
        }))()
        ctx.dispatch('increment') // Error（存在しないaction関数の実行（increment関数が存在するのはアクションではなくミューテーション））
      }
    }
  }
})
