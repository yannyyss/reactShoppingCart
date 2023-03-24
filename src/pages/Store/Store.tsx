import React from 'react'
import StoreItem from '../../components/StoreItem/StoreItem'
import { Row, Col } from 'react-bootstrap'
import items from '../../data/items.json'

function Store() {
  return (
    <Row lg={3} md={2} xs={1} className='g-3'>
      {items.map((item, i) => <Col key={i}><StoreItem {...item}/></Col>)}
    </Row>
  )
}

export default Store