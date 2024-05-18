import React, { createContext, useState } from 'react'

export const addprojectResponseContext = createContext()
export const editProjectResponseContext=createContext()

function Contextapi({children}) {
    const [addProjectResponse,setAddProjectResponse] = useState("")
    const [editProjectResponse,setEditProjectResponse]=useState("")
  return (
        <>
            <addprojectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
                <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
                {children}
                </editProjectResponseContext.Provider>
                
            </addprojectResponseContext.Provider>
        </>
    )
}

export default Contextapi