import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import base_url from '../Services/server_url';
import { editProjects } from '../Services/allApis';
import { toast } from 'react-toastify';
import { editProjectResponseContext } from '../../Context Api/Contextapi';
import { useContext } from 'react';


function Edit({project}) {
    const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)

    const [projectData, setProjectData] = useState({
        id: project._id, title: project.title, overview: project.overview, language: project.languages, github: project.github, demo: project.demo, projectImage: ""
    })
    const [imageStatus, setImageStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (projectData.projectImage.type === "image/jpg" || projectData.projectImage.type == "image/jpeg " || projectData.projectImage.type == "image/png") {
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
        else {
            setImageStatus(true)
            setPreview("")
        }
    }, [projectData.projectImage,editProjectResponse])
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPreview("")
        setProjectData({
            id: project._id, title: project.title, overview: project.overview, language: project.languages, github: project.github, demo: project.demo, projectImage: ""

        })

    };
    const handleShow = () => setShow(true);

    const handleUpdate = async () => {
        console.log(projectData)
        const { title, overview, language, github, demo } = projectData
        if (!title || !overview || !language || !github || !demo) {
            toast.warning("Provide Complete Data!!")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("language", language)
            formData.append("github", github)
            formData.append("demo", demo)
            preview ? formData.append("image", projectData.projectImage) : formData.append("image", project.image)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "ContentTtype": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result=await editProjects(projectData.id,formData,reqHeader)
                if(result.status==200){
                    toast.success(`Project ${projectData.title} Updated Successfully!`)
                    handleClose()
                    setEditProjectResponse(result)
                }
                else{
                    toast.warning(result.response.data)
                }

            }
            else {
                const reqHeader = {
                    " Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result=await editProjects(projectData.id,formData,reqHeader)
                if(result.status==200){
                    toast.success(`Project ${projectData.title} Updated Successfully!`)
                    handleClose()
                    setEditProjectResponse(result)
                }
                else{
                    toast.warning(result.response.data)
                }
            }
        }

    }

    return (
        <>
            <button className='btn me-3' onClick={handleShow}>
                <i className='fa-solid fa-pen-to-square fa-2xl'></i>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Add projects</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Col>
                                <label>
                                    <input type="file" name='' onChange={(e) => { setProjectData({ ...projectData, projectImage: e.target.files[0] }) }} />
                                    <img className='img-fluid' src={`${base_url}/uploads/${project.image}`} style={{ height: '160px' }} alt="img"/>


                                </label>
                                {
                                    imageStatus &&
                                    <p className='text-danger'> image extension invalid</p>
                                }

                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="titlle" className="mb-3">
                                        <Form.Control type="text" placeholder="title" value={projectData.title} onChange={(e) => { setProjectData({ ...projectData, title: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="overvierinp" label="overview" className="mb-3">
                                        <Form.Control type="text" placeholder="overview" value={projectData.overview} onChange={(e) => { setProjectData({ ...projectData, overview: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="languageinp" label="language" className="mb-3">
                                        <Form.Control type="text" placeholder="language" value={projectData.language} onChange={(e) => { setProjectData({ ...projectData, language: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="githubinp" label="github Url" className="mb-3">
                                        <Form.Control type="text" placeholder="githuburl" value={projectData.github} onChange={(e) => { setProjectData({ ...projectData, github: e.target.value }) }} />
                                    </FloatingLabel>
                                </div>
                            </Col>
                            <FloatingLabel controlId="demoinp" label="demo Url" className='p-1'>
                                <Form.Control type="text" placeholder="demo Url" value={projectData.demo} onChange={(e) => { setProjectData({ ...projectData, demo: e.target.value }) }} />
                            </FloatingLabel>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>update</Button>
                </Modal.Footer>


            </Modal>

        </>

    )
}

export default Edit