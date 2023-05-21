import React from 'react'
import { Navigate } from "react-router-dom"

const ProtectedTeacherRoute = ({children}) => {
    const t_id = localStorage.getItem("t_id")
    const type = localStorage.getItem("type")

    if(!t_id){
        return <Navigate to="/login/teacher" replace />
    }

    if(t_id && type==="teacher"){
        return children;
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className='text-center text-danger'>Access Denied!</h2>
                <h3 className='text-center'>You are not authorized to access this page!</h3>
            </div>
        </>
    )
}

export default ProtectedTeacherRoute