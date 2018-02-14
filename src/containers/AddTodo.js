import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import {
  Button,
  ButtonToolbar,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap'

let AddTodo = ({ dispatch }) => {
  return (
    <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!this.inputNode.value.trim()) {
              return
            }
            dispatch(addTodo(this.inputNode.value))
            this.inputNode.value = ''
          }}
        >
          <Col xs={9} md={8}>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Input Me!"
                inputRef={node => this.inputNode = node}
              />
            </FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
            >
              Add Todo
            </Button>
            <a
              href="http://line.me/R/msg/text/?ここにシェアしたい文章（URL+文章など）">
              <img
                src="/image/line.png"
                alt="LINEでシェアする"
                style={{
                  marginLeft: "5px",
                  height: "35px",
                  width: "35px"
                }}
              />
            </a>
            <a 
              href="http://twitter.com/share?url=http://playground-gctoyo.gemcook.com/&text=ここにシェアしたい文章">
              <img
                src="/image/twitter.png"
                alt="Twitterでシェアする"
                style={{
                  marginLeft: "5px",
                  height: "35px",
                  width: "35px"
                }}
              />
            </a>
            <a
              href="http://www.facebook.com/share.php?u=http%3A%2F%2Fplayground-gctoyo.gemcook.com%2F"
              onclick="window.open(this.href,'FBwindow','width=650,height=450,menubar=no,toolbar=no,scrollbars=yes');return false;"
              title="Facebookでシェア">
              <img
                src="/image/facebook.png"
                alt="Facebookでシェアする"
                style={{
                  marginLeft: "5px",
                  height: "35px",
                  width: "35px"
                }}
              />
            </a>
          </Col>
        </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
