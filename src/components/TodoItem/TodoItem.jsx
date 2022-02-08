import React from 'react';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({
  id,
  value,
  isDone,
  toogleTodoHandler,
  removeTodoHandler,
}) => {
  return (
    <ListItem
      sx={{ border: '0.1rem solid rgba(0, 0, 0, 0.23);' }}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={removeTodoHandler(id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        sx={{
          cursor: 'pointer',
          textDecoration: isDone ? 'line-through' : 'none',
          userSelect: 'none',
        }}
        primary={value}
        onClick={toogleTodoHandler(id)}
      />
    </ListItem>
  );
};

export default TodoItem;
