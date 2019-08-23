import { API_BASE } from '../config/env'
import axios from 'axios';

export const FETCH_TODOS_FULFILLED = "FETCH_TODOS_FULFILLED";
export const FETCH_TODOS_REJECTED = "FETCH_TODOS_REJECTED";
export const NEW_TODOS_FULFILLED = "NEW_TODOS_FULFILLED";
export const NEW_TODOS_REJECTED = "NEW_TODOS_REJECTED";
export const DELETE_TODO_FULFILLED = "DELETE_TODO_FULFILLED";
export const DELETE_TODO_REJECTED = "DELETE_TODO_REJECTED";
export const EDIT_TODO_FULFILLED = "EDIT_TODO_FULFILLED";
export const EDIT_TODO_REJECTED = "EDIT_TODO_REJECTED";

export function fetchTodos() {
    return dispatch => {
        dispatch({
            type: "FETCH_TODOS",
            payload: axios.get(API_BASE)
                .then(result => result.data.todos)
        })
    }
}

export function onNewTodoSubmit({ title, statuss }) {
    return dispatch => {
        dispatch({
            type: "NEW_TODOS",
            payload: axios.post(API_BASE, {
                title, statuss
            })
                .then(result => Object.assign({}, result, {}))
        })
    }
}

export function deleteTodo(id) {
    return dispatch => {
        dispatch({
            type: "DELETE_TODO",
            payload: axios.delete(`${API_BASE}/` + id + '')
                .then(result => Object.assign({}, result, { id }))
        })
    }
}

export function editTodo(id, statuss, title) {
    return dispatch => {
        dispatch({
            type: "EDIT_TODO",
            payload: axios.put(`${API_BASE}/` + id + '', {
                title, statuss
            })
                .then(result => Object.assign({}, result, { statuss }))
        })
    }
}