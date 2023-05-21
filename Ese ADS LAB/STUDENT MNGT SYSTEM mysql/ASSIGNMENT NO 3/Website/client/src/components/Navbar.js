import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation()

    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <span className="navbar-brand">SRS University</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?"active":""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className={`nav-link dropdown-toggle ${location.pathname.startsWith("/forms")===true?"active":""}`} to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Forms
                            </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/forms/advisor">Advisor</Link>
                            <Link className="dropdown-item" to="/forms/classroom">Classroom</Link>
                            <Link className="dropdown-item" to="/forms/course">Course</Link>
                            <Link className="dropdown-item" to="/forms/department">Department</Link>
                            <Link className="dropdown-item" to="/forms/instructor">Instructor</Link>
                            <Link className="dropdown-item" to="/forms/prereq">Prerequisite</Link>
                            <Link className="dropdown-item" to="/forms/section">Section</Link>
                            <Link className="dropdown-item" to="/forms/student">Student</Link>
                            <Link className="dropdown-item" to="/forms/takes">Takes</Link>
                            <Link className="dropdown-item" to="/forms/teaches">Teaches</Link>
                            <Link className="dropdown-item" to="/forms/timeslot">Time Slot</Link>
                        </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar