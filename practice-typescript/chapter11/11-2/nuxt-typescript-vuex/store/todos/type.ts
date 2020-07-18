export interface Todo {
  id: string
  createdAt: Date
  task: string
  done: boolean
}

// State
export interface S {
  todos: Todo[]
  count: number
}

// Getters
export interface G {
  todosCount: number
  doneCount: number
}

// Root Getters
export interface RG {
  'todos/todosCount': G['todosCount']
  'todos/doneCount': G['doneCount']
}

// Mutations
export interface M {
  addTodo: { todo: Todo }
  doneTodo: { id: string }
}

// Root Mutations
export interface RM {
  'todos/addTodo': M['addTodo']
  'todos/doneTodo': M['doneTodo']
}

// Actions
export interface A {
  asyncAddTodo: { todo: Todo }
  asyncDoneTodo: { id: string }
}

// Root Actions
export interface RA {
  'todos/asyncAddTodo': A['asyncAddTodo']
  'todos/asyncDoneTodo': A['asyncDoneTodo']
}
