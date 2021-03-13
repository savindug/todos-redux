import { sampleTodos } from '../../sampleTodos';
import * as ACTION_TYPES from './types';
export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.GET_TODOS_PROGRESS });
  dispatch({
    type: ACTION_TYPES.GET_TODOS,
    payload: sampleTodos,
  });
  // await localStorage
  //   .getItem('todos')
  //   .then((res) => {
  //     let todos = JSON.parse(res);
  //     console.log('%o' + todos);
  //     dispatch({
  //       type: ACTION_TYPES.GET_TODOS,
  //       payload: todos,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: ACTION_TYPES.GET_TODOS_FAILED,
  //       payload: err,
  //     });
  //   });
};

export const addTodo = (todo) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.ADD_TODO_PROGRESS });

  dispatch({
    type: ACTION_TYPES.ADD_TODO,
    payload: todo,
  });

  localStorage.setItem('todos', JSON.stringify(getState().todos.todoList));
};

export const editTodo = (todo) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.SELECT_TODO_PROGRESS });

  dispatch({
    type: ACTION_TYPES.SELECT_TODO,
    payload: todo,
  });

  localStorage.setItem('todos', JSON.stringify(getState().todos.todoList));
};

export const removeTodo = (id) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.DELETE_TODO,
    payload: id,
  });

  //localStorage.setItem('todos', JSON.stringify(getState().todos.todoList));
};
