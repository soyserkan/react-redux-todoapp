import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Header,Segment } from 'semantic-ui-react'
import { fetchTodos, onNewTodoSubmit, deleteTodo, editTodo } from '../actions/todos';

import TodosList from './TodosList';

class HomePage extends Component {
    state = {
        title: '',
        statuss: '1'
    };
    static propTypes = {
        todos: PropTypes.object.isRequired,
        onNewTodoSubmit: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        editTodo: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.fetchTodos();
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onHandleSubmit = (e) => {
        e.preventDefault();
        this.props.onNewTodoSubmit(this.state);
        this.setState({
          title: ''
        });   
    }

    render() {
        return (
            <div>
                <Header as='h2' attached='top' style={{marginTop:'50px'}} textAlign='center'>
                    to-do List
                </Header>
                <Segment attached>
                <Input
                    id='title'
                    name='title'
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder='Add'
                    style={{ marginBottom: '20px', marginRight: '10px' }}
                />
                <Button primary content='Add' onClick={this.onHandleSubmit} />
                <TodosList
                    todos={this.props.todos}
                    deleteTodo={this.props.deleteTodo}
                    editTodo={this.props.editTodo}
                />
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = ({ todos }) => {
    return {
        todos
    }
};

const mapDispatchToProps = {
    fetchTodos,
    onNewTodoSubmit,
    deleteTodo,
    editTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);