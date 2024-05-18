import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../Components/Add'
import Edit from './Edit'
import Profile from '../Components/Profile'
import { deleteProject, userProjects } from '../Services/allApis'
import { addprojectResponseContext, editProjectResponseContext } from '../../Context Api/Contextapi'
import { toast } from 'react-toastify'
function Dashboard() {

  const { addProjectResponse, setAddProjectResponse } = useContext(addprojectResponseContext)
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)

  const [user, setUser] = useState("")
  const [projects, setProjects] = useState([])

  useEffect(() => {
    setUser(sessionStorage.getItem("username"))
    getData()
  }, [addProjectResponse, editProjectResponse])
  console.log(projects)
  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await userProjects(header)
    if (result.status == 200) {
      setProjects(result.data)
    }
    else {
      console.log(result.response.data)
    }
  }

  const handleDeleteProject = async (id) => {
    const token = sessionStorage.getItem('token')
    console.log(id)
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    }
    const result = await deleteProject(id, header)
    if (result.status == 200) {
      toast.success("project deleted successfully!!")
      getData()
    }
    else {
      console.log(result)
      toast.error(result.response.data)
    }

  }
  return (
    <>
      <Header />
      <div className='p-2'>
        <h1>welcome <span className='text-warning'>{user}</span></h1>
      </div>
      <div >
        <Row>
          <Col sm={12} md={6} className='p-3'>
            <h3>your projects</h3>
            <div className='border border-3 p-3'>
              <Add />

              {
                projects.length > 0 ?
                  projects.map(item => (
                    <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
                      <h4>{item.title}</h4>
                      <div>
                        <a href="" className='btn mt-3'>
                          <i className="fa-brands fa-github fa-2xl" />
                        </a>
                        <Edit project={item} />
                        <button className='btn mt-3' onClick={() => { handleDeleteProject(item?._id) }}>
                          <i className="fa-solid fa-trash fa-2xl" />
                        </button>
                      </div>
                    </div>


                  ))
                  :
                  <h3 className='text-center '>no projects available</h3>
              }

            </div>
          </Col>
          <Col sm={8} md={6}>
            <Profile />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard