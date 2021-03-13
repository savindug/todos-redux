import * as ACTION_TYPES from './types';

let todo = {
  id: '',
  name: '',
  status: '',
  priority: '',
  color: '',
  timestamp: '',
};

export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.GET_TODOS_PROGRESS });

  await localStorage
    .getItem('todos')
    .then((res) => {
      let todos = JSON.parse(res);
      console.log('%o' + todos);
      dispatch({
        type: ACTION_TYPES.GET_TODOS_PROGRESS,
        payload: todos,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ACTION_TYPES.LOGIN_FAILED,
        payload: err,
      });
    });
};

export const addTodo = (todo) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.ADD_TODO_PROGRESS });

  dispatch({
    type: ACTION_TYPES.ADD_TODO,
    payload: todo,
  });

  localStorage.setItem('todos', JSON.stringify(getState().todos.todoList));
};

export const removeTodo = (name) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.DELETE_TODO,
    payload: name,
  });

  localStorage.setItem('todos', JSON.stringify(getState().todos.todoList));
};
