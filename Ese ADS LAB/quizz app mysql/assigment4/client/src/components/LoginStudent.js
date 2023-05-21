import React from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginStudent = () => {
    let navigate = useNavigate()

    const [prn, setPrn] = useState("");
    const [pass, setPass] = useState("");
    
    const LoginStudent = (e) => {
        e.preventDefault()

        Axios.post("http://localhost:3001/auth/student", {
            prn: prn,
            pass: pass
        }).then((response) => {
            if(response.data.message){
                window.alert(response.data.message)
            }else{
                localStorage.setItem("type", "student")
                localStorage.setItem("prn", response.data[0].prn)
                navigate("/")
                window.dispatchEvent(new Event('storage'))
            }
        });
    };

    return (
        <div className="container mt-4">
            <h3>Student's Login</h3>
            <form action="" onSubmit={(e) => LoginStudent(e)}>
                <div className="form-group">
                    <label>PRN</label>
                    <input required={true} type="text" name='username' className="form-control" placeholder="Enter PRN" onChange={(event) => {
                        setPrn(event.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input required={true} type="password" name='password' className="form-control" placeholder="Enter Password" onChange={(event) => {
                        setPass(event.target.value);
                    }} />
                </div>

                <button type='submit' className="btn btn-success">Login</button>
            </form>
        </div>
    )
}

export default LoginStudent