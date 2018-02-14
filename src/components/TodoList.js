import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import { Panel, Col } from 'react-bootstrap'


const TodoList = ({ todos, onTodoClick }) => (
  <Panel
    header="Todo List"
    bsStyle="primary"
    className="col-md-8 col-xs-9"
    style={{
      marginTop: "10px"
    }}
  >
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </Panel>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
