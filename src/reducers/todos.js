import {
    FETCH_TODOS_FULFILLED,
    FETCH_TODOS_REJECTED,
    DELETE_TODO_FULFILLED,
    DELETE_TODO_REJECTED,
    NEW_TODOS_FULFILLED,
    NEW_TODOS_REJECTED,
    EDIT_TODO_FULFILLED,
    EDIT_TODO_REJECTED
} from '../actions/todos'

const initialState = {
    fetching: false,
    todos: [],
    error: {}
};

export default (state = initialState, action) => {
  
    switch (action.type) {

        //FETCH
        case FETCH_TODOS_FULFILLED:
            return {
                ...state,
                todos: action.payload
            };
        case FETCH_TODOS_REJECTED:
            return {
                ...state,
                error: action.payload
            };

        //ADD
        case NEW_TODOS_FULFILLED:
            return {
                ...state,
                todos: state.todos.concat(action.payload.data.todo)
            };
        case NEW_TODOS_REJECTED:
            return {
                ...state,
                error: action.payload
            };

        // DELETE
        case DELETE_TODO_FULFILLED:
            return {
                ...state,
                todos: state.todos.filter(item => item._id !== action.payload.id)
            };
        case DELETE_TODO_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        //EDIT
        case EDIT_TODO_FULFILLED:
            return {
                ...state,
                todos: state.todos.filter(item => item._id !== action.payload.id)
            };
        case EDIT_TODO_REJECTED:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}