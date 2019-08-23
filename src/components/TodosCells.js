import React from 'react'
import { Button, Segment, List, Checkbox } from 'semantic-ui-react'

const TodosCells = ({ todo, deleteTodo, editTodo }) => (
    
        <List divided verticalAlign='middle'>
            <List.Item>
                <List.Content floated='right'>
                <Button color='red' onClick={() => deleteTodo(todo._id)}>Delete</Button>
                </List.Content>
                <Segment compact>
                    {
                         todo.statuss === '2'
                         ? <Checkbox label={<label style={{textDecorationLine:'line-through'}}>{todo.title}</label>} onChange={() => editTodo(todo._id, todo.statuss = '1', todo.title)} checked={true} />
                         : <Checkbox label={todo.title} onChange={() => editTodo(todo._id, todo.statuss = '2', todo.title)} checked={false}/>
                    }
                   
                </Segment>
            </List.Item>
        </List>
)
export default TodosCells;