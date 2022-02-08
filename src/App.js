import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TodoList from './components/TodoList/TodoList';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { todosSelector } from './slices/todos';
import Alert from '@mui/material/Alert';
import {
  completedFirstSort,
  uncompletedFirstSort,
} from './assets/js/todoHelpers';
import AddNewTask from './components/AddNewTask/AddNewTask';

/* Sort types for select*/
let sortTypes = [
  { value: 'completed_first', label: 'Сначала выполненые' },
  { value: 'uncompleted_first', label: 'Сначала не выполненые' },
];

function App() {
  const { todos } = useSelector(todosSelector);
  const [sortType, setSorType] = useState('completed_first');
  const [searchTodoQuery, setSearchTodoQuery] = useState('');
  const [isAddTodoOpen, setIsTodoOpen] = useState(false);

  const handleCloseTodoDialog = () => {
    setIsTodoOpen(false);
  };

  /**
   * Sort handler
   */
  const sortChangehandler = e => {
    setSorType(e.target.value);
  };

  /**
   * Sort by type function
   */
  const sortTodos = todos => {
    let sortFunc =
      sortType === 'completed_first'
        ? completedFirstSort
        : uncompletedFirstSort;

    let sortTodos = [...todos].sort(sortFunc);
    return sortTodos;
  };

  /**
   * Get amount of completed uncompleted tasks
   */
  const getTasksInfo = todos => {
    let completedTasksQty, uncompletedTasksQty;
    completedTasksQty = uncompletedTasksQty = 0;

    todos.forEach(todo => {
      todo.isDone ? ++completedTasksQty : ++uncompletedTasksQty;
    });
    return [completedTasksQty, uncompletedTasksQty];
  };

  const filterBySearchField = todos => {
    return todos.filter(todo =>
      todo.value.toLowerCase().includes(searchTodoQuery.toLowerCase())
    );
  };

  let todosForRender = sortTodos(todos);
  todosForRender = filterBySearchField(todosForRender);
  const [completedTasksQty, uncompletedTasksQty] = getTasksInfo(todosForRender);

  return (
    <>
      <Header></Header>
      <Container className="todo-wrapper">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <TextField
            id="todo-search"
            label="Поиск по названию"
            type="search"
            variant="filled"
            onChange={e => setSearchTodoQuery(e.target.value)}
            value={searchTodoQuery}
          />
          <Select
            value={sortType}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={sortChangehandler}
          >
            {sortTypes.map(sortType => (
              <MenuItem key={sortType.value} value={sortType.value}>
                {sortType.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginBottom: '1rem',
          }}
        >
          <Button variant="contained" onClick={() => setIsTodoOpen(true)}>
            Добавить новую задачу
          </Button>
        </Box>
        <Box>
          {todosForRender.length === 0 && searchTodoQuery.length !== 0 ? (
            <Alert severity="warning">Такие названия задач отсутствуют!</Alert>
          ) : todosForRender.length === 0 ? (
            <Alert severity="warning">У нас отсутствуют задачи!</Alert>
          ) : (
            <TodoList todoList={todosForRender}></TodoList>
          )}
        </Box>
        <Box>
          <Stack
            sx={{
              dispaly: 'flex',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item>Выполненных задач:{completedTasksQty}</Item>
            <Item>Не выполненных задач: {uncompletedTasksQty}</Item>
          </Stack>
        </Box>
      </Container>

      <AddNewTask
        isOpen={isAddTodoOpen}
        handleCloseTodoDialog={handleCloseTodoDialog}
      />
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default App;
