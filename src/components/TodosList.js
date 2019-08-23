import React from 'react';
import PropTypes from 'prop-types';
import TodosCells from './TodosCells'


const TodosList = ({ todos,deleteTodo,editTodo }) => {
    const emptyMessage = (
        <p>There are no todo list yet.</p>
    )
    const todosList = (
        <div>
            {
                todos.error.response ? <h3>Error Retrieving data!</h3>
                    : todos.todos.map(todo => <TodosCells key={todo._id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />)
            }
        </div>
    )


    return (
        <div>
            {todos.length === 0 ? emptyMessage : todosList}
        </div>
    );
};

TodosList.propTypes = {
    todos: PropTypes.shape({
        todos: PropTypes.array.isRequired
    }).isRequired
}
export default TodosList;