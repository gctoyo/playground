import React from 'react'
import FilterLink from '../containers/FilterLink'
import { ButtonToolbar } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavItem } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'

const Menu = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">GC-Toyo Playground</a>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav pullRight>
      <NavDropdown eventKey={1} title="Menu" >
        <MenuItem eventKey={1.1}>Todo</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={1.2}>未定</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={1.3}>未定</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
)

export default Menu
