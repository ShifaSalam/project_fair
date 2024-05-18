import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import server_url from '../Services/server_url'

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(project)
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" onClick={handleShow} src={project.image?`${server_url}/uploads/${project.image}`:"https://www.bluecamroo.com/content/images/Steps%20in%20Project%20Management%20Process.jpg"} alt='img' />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project 1</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img className='img-fluid' src={project.image?`${server_url}/uploads/${project.image}`:"https://www.bluecamroo.com/content/images/Steps%20in%20Project%20Management%20Process.jpg"} alt="img" />
                        </Col>
                        <Col>
                            <h4>{project.title}</h4>
                            <p>{project.overview}</p>
                            <h6>{project.languages}</h6>
                            <div className='mt-3 p-3 d-flex justify-content-between'>
                                <a href={project.github}>
                                    <i class="fa-brands fa-github"></i>
                                </a>
                                <a href={project.demo}>
                                    <i class="fa-solid fa-link"></i>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProjectCard