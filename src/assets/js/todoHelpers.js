export const completedFirstSort = (todo1, todo2) => {
  if (todo1.isDone && !todo2.isDone) return -1;
  if (!todo1.isDone && todo2.isDone) return 1;
  if (todo1.isDone === todo2.isDone) return 0;
};

export const uncompletedFirstSort = (todo1, todo2) => {
  if (todo1.isDone && !todo2.isDone) return 1;
  if (!todo1.isDone && todo2.isDone) return -1;
  if (todo1.isDone === todo2.isDone) return 0;
};
