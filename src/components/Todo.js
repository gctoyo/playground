import React from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'react-bootstrap'

const Todo = ({ onClick, completed, text }) => (
  <ListGroupItem
    onClick={onClick}
    style={{
      width: "100%",
      textDecoration: completed ? 'line-through' : 'none',
      backgroundColor: completed ? '#c5e59f' : '#ffffff'
    }}
    disabled={completed}
  >
    {text}
  </ListGroupItem>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
