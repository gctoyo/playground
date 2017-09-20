import React from 'react'
import FilterLink from '../containers/FilterLink'
import { ButtonToolbar } from 'react-bootstrap'

const Footer = () => (
  <ButtonToolbar
    style={{
      margin: "15px"
    }}
  >
    <FilterLink filter="SHOW_ALL">
      全て表示
    </FilterLink>
    <FilterLink filter="SHOW_ACTIVE">
      未完了
    </FilterLink>
    <FilterLink filter="SHOW_COMPLETED">
      完了済み
    </FilterLink>
  </ButtonToolbar>
)

export default Footer
