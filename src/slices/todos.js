import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  todos: [
    { id: 1, value: 'Изучить TypeScript', isDone: false },
    { id: 2, value: 'Изучить JavaScript', isDone: true },
    { id: 3, value: 'Изучить Scss', isDone: true },
    { id: 4, value: 'Изучить GraphQL', isDone: false },
    { id: 5, value: 'Изучить HTML', isDone: true },
    { id: 6, value: 'Изучить React', isDone: true },
    { id: 7, value: 'Изучить Redux', isDone: true },
  ],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push({ id: uuidv4(), value: payload, isDone: false });
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter(todo => todo.id !== payload);
    },
    toggleTodo: (state, { payload }) => {
      let todo = state.todos.find(todo => todo.id === payload);
      todo.isDone = !todo.isDone;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export const todosSelector = state => state.todos;
export default todosSlice.reducer;
