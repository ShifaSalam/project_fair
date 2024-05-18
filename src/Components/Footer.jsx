import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'


function Footer() {
  return (
    <>

      <div className='d-flex justify-content-between bg-dark text-light p-5'>
        <Row>
          <Col>
            <h3>Project Fair 2024</h3>
            <p style={{ textAlign: 'justify' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Col>
          <Col className='d-flex flex-column align-items-center'>
            <h3 className='text-light'>Links</h3>
            <Link to={'/'} >Landing</Link>
            <Link to={'/log'}>Login</Link>
            <Link to={'/reg'}>Register</Link>
          </Col>
          <Col className='d-flex flex-column align-items-center'>
            <h3 className='text-light'>References</h3>
            <a href="https://react-bootstrap.github.io/" target='_blank' >React Bootstrap</a>
            <a href="https://react.dev/" target='_blank'>React</a>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Footer