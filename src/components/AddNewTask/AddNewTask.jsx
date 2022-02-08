import React, { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../slices/todos';

const AddNewTask = ({ isOpen, handleCloseTodoDialog }) => {
  const dispatch = useDispatch();
  const todoField = useRef(null);
  const [isTodoFieldError, setIsTodoFieldError] = useState(false);
  const minTodoChars = 4;

  const handleClose = () => {
    setIsTodoFieldError(false);
    handleCloseTodoDialog();
  };

  const handleAddTodo = () => {
    if (todoField.current.value.length < minTodoChars) {
      setIsTodoFieldError(true);
      return;
    } else {
      dispatch(addTodo(todoField.current.value));
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
      <DialogTitle>Добавить новую задачу</DialogTitle>
      <DialogContent>
        <TextField
          error={isTodoFieldError}
          helperText={
            isTodoFieldError
              ? `Поле не должно быть пустым, и содержать как минимум ${minTodoChars} символа`
              : ''
          }
          inputRef={todoField}
          label="Введите название задачи"
          multiline
          maxRows={4}
          sx={{ width: '100%' }}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Закрыть</Button>
        <Button onClick={handleAddTodo}>Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewTask;
