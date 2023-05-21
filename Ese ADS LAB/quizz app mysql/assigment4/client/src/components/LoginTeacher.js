import React from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginTeacher = () => {
    let navigate = useNavigate()

    const [id, setID] = useState(0);
    const [pass, setPass] = useState("");

    const LoginTeacher = (e) => {
        e.preventDefault()

        Axios.post("http://localhost:3001/auth/teacher", {
            t_id: id,
            pass: pass
        }).then((response) => {
            if (response.data.message) {
                window.alert(response.data.message)
            } else {
                localStorage.setItem("type", "teacher")
                localStorage.setItem("t_id", response.data[0].t_id)
                navigate("/")
                window.dispatchEvent(new Event('storage'))
            }
        });
    };

    return (
        <div className="container mt-4">
            <h3>Teacher's Login</h3>
            <form onSubmit={(e) => {LoginTeacher(e)}}>
            <div className="form-group">
                <label>ID</label>
                <input required={true} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter ID" onChange={(event) => {
                    setID(event.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input required={true} type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" onChange={(event) => {
                    setPass(event.target.value);
                }} />
            </div>

            <button className="btn btn-success" type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginTeacher