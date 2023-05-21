import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Navbar = () => {
    let location = useLocation()
    let navigate  = useNavigate()

    const [type, setType] = useState("")
    const [prn, setPrn] = useState("")
    const [id, setID] = useState(0)

    useEffect(() => {
        window.addEventListener('storage', () => {
            setType(localStorage.getItem("type"))
            setPrn(localStorage.getItem("prn"))
            setID(localStorage.getItem("t_id"))
        })
    }, [])

    const logout = () => {
        localStorage.removeItem("type")
        localStorage.removeItem("prn")
        localStorage.removeItem("t_id")
        setType("")
        navigate("/")
    }

    return (
        <>
            {(() => {
                switch (type) {
                    case "student":
                        return (
                            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                                <span className="navbar-brand">Quiz App</span>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarText">
                                    <ul className="navbar-nav mr-auto" style={{ alignItems: "center" }}>
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle ${location.pathname.startsWith("/quiz") === true ? "active" : ""}`} to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Quiz
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/quiz/attempt">Attempt Quiz</Link>
                                                <Link className="dropdown-item" to="/quiz/result">Result</Link>
                                            </div>
                                        </li>
                                    </ul>

                                    <span className='navbar-text'>
                                        <button className={`btn btn-danger`} style={{ height: "fit-content", width: "fit-content", marginBlock: "auto", marginRight: "1rem" }} onClick={logout}>Logout</button>

                                        <span>
                                            Logged in as: {prn}
                                        </span>
                                    </span>
                                </div>
                            </nav>
                        )

                    case "teacher":
                        return (
                            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                                <span className="navbar-brand">Quiz App</span>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarText">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle ${location.pathname.startsWith("/quiz") === true || location.pathname.startsWith("/result") === true  ? "active" : ""}`} to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Quiz
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/quiz/create">Create</Link>
                                                <Link className="dropdown-item" to="/quiz/view">My Quizes</Link>
                                                <Link className="dropdown-item" to="/quiz/details">Quiz Details</Link>
                                            </div>
                                        </li>
                                    </ul>

                                    <span className='navbar-text'>
                                        <button className={`btn btn-danger`} style={{ height: "fit-content", width: "fit-content", marginBlock: "auto", marginRight: "1rem" }} onClick={logout}>Logout</button>

                                        <span>
                                            Logged in as: {id}
                                        </span>
                                    </span>
                                </div>
                            </nav>
                        )

                    default:
                        return (
                            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                                <span className="navbar-brand">Quiz App</span>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarText">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle ${location.pathname.startsWith("/register") === true ? "active" : ""}`} to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Register
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/register/student">Student</Link>
                                                <Link className="dropdown-item" to="/register/teacher">Teacher</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className={`nav-link dropdown-toggle ${location.pathname.startsWith("/login") === true ? "active" : ""}`} to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Login
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/login/student">Student</Link>
                                                <Link className="dropdown-item" to="/login/teacher">Teacher</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        )
                }
            })()}
        </>
    )
}

export default Navbar