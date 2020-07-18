import 'vuex'
import * as Root from '../store/type'
import * as Counter from '../store/counter/type'
import * as CounterNest from '../store/counter/nest/type'
import * as Todos from '../store/todos/type'
import * as TodosNest from '../store/todos/nest/type'

declare module 'vuex' {
  type RootState = Root.S & {
    counter: Counter.S & {
      nest: CounterNest.S
    }
    todos: Todos.S & {
      nest: TodosNest.S
    }
  }
  type RootGetters = Counter.RG & CounterNest.RG & Todos.RG & TodosNest.RG
  type RootMutations = Counter.RM & Todos.RM
  type RootActions = Counter.RA & Todos.RA
}
