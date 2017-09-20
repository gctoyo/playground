import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <Button bsStyle="info">{children}</Button>
  }

  return (
    <Button
      href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </Button>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
