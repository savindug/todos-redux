import * as ACTION_TYPES from '../actions/types';

const initialState = {
  todoList: [],
  todo: {},
  loading: true,
  err: null,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_TODOS:
      return {
        ...state,
        todoList: action.payload,
        loading: false,
      };

    case ACTION_TYPES.GET_TODOS_PROGRESS:
      return {
        ...state,
        loading: true,
      };

    case ACTION_TYPES.GET_TODOS_FAILED:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    case ACTION_TYPES.ADD_TODO:
      return {
        ...state,
        todo: action.payload,
        todoList: [...state.todoList, action.payload],
        loading: false,
      };

    case ACTION_TYPES.ADD_TODO_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.ADD_TODO_FAILED:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    //select todo
    case ACTION_TYPES.SELECT_TODO:
      return {
        ...state,
        todo: state.todoList.map((e) => {
          if (e.id === action.payload.id) {
            e.title = action.payload.title;
            e.priority = action.payload.priority;
            e.completed = action.payload.completed;
            e.color = action.payload.color;
          }
          return 1;
        }),
        loading: false,
      };

    case ACTION_TYPES.SELECT_TODO_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.SELECT_TODO_FAILED:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    //delete todo
    case ACTION_TYPES.DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(
          (element) => element.id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default todosReducer;
