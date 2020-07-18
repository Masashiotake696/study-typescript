import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

export const state = (): S => ({
  todos: []
})

export const getters: Getters<S, G> = {
  todosCount(state) {
    return state.todos.length
  },
  doneCount(state) {
    return state.todos.filter(todo => todo.done).length
  }
}

export const mutations: Mutations<S, M> = {
  addTodo(state, payload) {
    state.todos.push(payload.todo)
  },
  doneTodo(state, payload) {
    state.todos = state.todos.map(todo => {
      if (todo.id !== payload.id) {
        return todo
      }
      return { ...todo, done: true }
    })
  }
}

export const actions: Actions<S, A, G, M> = {
  asyncAddTodo({ commit }, payload) {
    commit('addTodo', payload)
  },
  asyncDoneTodo({ commit }, payload) {
    commit('doneTodo', payload)
  }
}
