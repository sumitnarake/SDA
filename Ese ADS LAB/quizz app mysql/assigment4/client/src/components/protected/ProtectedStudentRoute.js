import React from 'react'
import { Navigate } from "react-router-dom"

const ProtectedStudentRoute = ({children}) => {
    const prn = localStorage.getItem("prn")
    const type = localStorage.getItem("type")

    if(!prn){
        return <Navigate to="/login/student" replace />
    }

    if(prn && type==="student"){
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

export default ProtectedStudentRoute