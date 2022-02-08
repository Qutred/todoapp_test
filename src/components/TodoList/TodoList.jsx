import React from 'react';
import { List } from '@mui/material';
import TodoItem from '../TodoItem/TodoItem';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../../slices/todos';

const TodoList = ({ todoList }) => {
  const dispatch = useDispatch();

  const toogleTodoHandler = id => {
    return () => dispatch(toggleTodo(id));
  };

  const removeTodoHandler = id => {
    return () => dispatch(removeTodo(id));
  };

  return (
    <List sx={{ maxHeight: '26rem', overflow: 'auto' }}>
      <TransitionGroup>
        {todoList.map(todo => {
          return (
            <Collapse key={todo.id}>
              <TodoItem
                id={todo.id}
                value={todo.value}
                isDone={todo.isDone}
                toogleTodoHandler={toogleTodoHandler}
                removeTodoHandler={removeTodoHandler}
              ></TodoItem>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </List>
  );
};

export default TodoList;
