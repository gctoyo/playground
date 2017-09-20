import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Button, ButtonToolbar } from 'react-bootstrap'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div
      style={{
        margin: "15px"
      }}
    >
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
          style={{
            width: "50%"
          }}
        />
        <Button
          type="submit"
          bsStyle="primary"
          style={{
            margin: "10px"
          }}
        >
          Add Todo
        </Button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
