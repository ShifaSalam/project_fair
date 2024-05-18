import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProject } from '../Services/allApis';
import { addprojectResponseContext } from '../../Context Api/Contextapi';


function Add() {
  const {addProjectResponse,setAddProjectResponse}=useContext(addprojectResponseContext)
  console.log(useContext(addprojectResponseContext))
  const [show, setShow] = useState(false);
  const [preview,setPreview]=useState("")
  const [projectData,setProjectData]=useState({
    title:"",overview:"",language:"",github:"",demo:"",projectImage:""
  })
  const [imageStatus,setImageStatus]=useState(false)

  useEffect(()=>{
    console.log(projectData)
    if(projectData.projectImage.type=="image/jpg" || projectData.projectImage.type=="image/jpeg" || projectData.projectImage.type=="image/png"){
      console.log("Image has correct format")
      setImageStatus(false)
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
      console.log("Invalid file format! Image should be jpg,png or jpeg")
      setImageStatus(true)
      setPreview("")
    }
  },[projectData.projectImage])

  const handleAddProject=async()=>{
    const {title,overview,language,github,demo,projectImage}=projectData
    if(!title||!overview||!language||!github||!demo||!projectImage){
      toast.warning("Provide Complete Data!!")
    }
    else{
      const formData=new FormData()
      formData.append("title",title)
      formData.append("overview",overview)
      formData.append("language",language)
      formData.append("github",github)
      formData.append("demo",demo)
      formData.append("image",projectImage)

      const token=sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result=await addProject(formData,reqHeader)
      if(result.status==200){
        toast.success("Project added successfully!")
        setProjectData({
          title:"",overview:"",language:"",github:"",demo:"",projectImage:""
        })
        handleClose()
        setAddProjectResponse(result)
      }
      else{
        toast.error(result.response.data)
      }
    }
  }
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <button className='btn btn-info mb-4' onClick={handleShow}>
        Add Project 
    </button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
            <Row>
                <Col>
                <label >
                    <input type="file" name='' id='in' style={{display:'none'}} onChange={(e)=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                <img className='img-fluid' src={preview?preview:"https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-gallery-icon-png-image_515223.jpg"} alt="" />
                </label>
                {
                  imageStatus&&
                  <p className='text-danger'>Invalid file format! Image should be jpg,png or jpeg</p>
                }
                </Col>
            <Col>
            <div>
            <FloatingLabel controlId="titleinp" label="Title" className="mb-3">
               <Form.Control type="text" placeholder="Project title" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
            </FloatingLabel>
            <FloatingLabel controlId="overviewinp" label="Overview">
             <Form.Control type="text" placeholder="Brief about Project" onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
            </FloatingLabel>
            <FloatingLabel controlId="langinp" label="Languages">
             <Form.Control type="text" placeholder="Languages used" onChange={e=>setProjectData({...projectData,language:e.target.value})}/>
            </FloatingLabel>
            <FloatingLabel controlId="githubinp" label="GitHub url">
             <Form.Control type="text" placeholder="GitHub url" onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
            </FloatingLabel>
            </div>
            </Col>
            <FloatingLabel controlId="demoinp" label="Demo url">
             <Form.Control type="text" placeholder="Demo url" onChange={e=>setProjectData({...projectData,demo:e.target.value})} />
            </FloatingLabel>

            </Row>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddProject}>Save</Button>
        </Modal.Footer>
      </Modal>
    
    </>

  )
}

export default Add