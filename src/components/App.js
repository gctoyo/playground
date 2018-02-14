import React from 'react'
import Menu from './Menu'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <Menu />
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
