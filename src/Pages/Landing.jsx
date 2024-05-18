import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjects } from '../Services/allApis'

function Landing() {
  const [token,setToken]=useState("")
  const [projects,setProjects]=useState([])
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
    getHomeProjects()
  },[])

  const getHomeProjects=async()=>{
    const result=await homeProjects()
    // console.log(result)
    if(result.status==200){
      setProjects(result.data)
    }
    else{
      console.log(result.response.data)
    }
  }
  console.log(projects)
  return (
    <>
      <div className='w-100 p-5 align-items-center d-flex' style={{ height: '100vh', backgroundColor: 'rgb(195 236 254)' }}>
      <Row>
        <Col className='align-items-center-d-flex'>
          <div>
            <h1 className='display-4 mb-2 text-light'>Project Fair</h1>
            <p style={{ textAlign: 'justify' }}>Lorem Ipsum is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            {/* <button className='btn btn-success'>Explore</button> */}
            {
              token?
              <Link className='btn btn-success' to={'/dash'}>Manage your projects..</Link>
              :
              <Link className='btn btn-success' to={'/auth'}>Start to Explore..</Link>
            }

          </div>
        </Col>
        <Col>
          <img src="https://ewm.swiss/application/files/4915/8688/0364/6_UX_Design_Elements_to_Include_for_a_Powerful_Web_Design_-_EWM_SA_.jpg" className='img-flud' height={'400px'} alt="img" />
        </Col>
      </Row>
      </div>

      <div className='p-5 w-100'>
        <h2 className='text-center mt-4 mb-3'>Projects For You...</h2>

        <marquee behavior="" direction="">
          <div className="d-flex justify-content-evenly mt-2">
            {
              projects.length>0?
              projects.map(item=>(
                <ProjectCard project={item}/>
              ))
              :
              <h5>No Projects Available</h5>
            }
            
          </div>
        </marquee>

        <div className="text-center">
          <Link to={'/projects'}>Click for more..</Link>
        </div>
      </div>
    </>
  )
}

export default Landing