import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios";

var quiz_id

const AttemptedStudents = () => {
    let navigate = useNavigate()

    const [attemptedList, setAttemptedList] = useState([])

    useEffect(() => {
        quiz_id = prompt("Enter Quiz ID to get details:")

        if (quiz_id == null) {
            navigate("/")
            return
        }

        if (quiz_id.length === 0) {
            alert("Quiz ID cannot be null!")
            navigate("/")
            return
        }

        Axios.get(`http://localhost:3001/get/attempts/${quiz_id}`).then((response) => {
            if (response.data.length === 0) {
                alert("No Quiz with such ID exists!");
                navigate("/")
            }
            else {
                setAttemptedList(response.data)
            }
        });
    }, [])

    function convertTo12Hour(oldFormatTime) {
        var dt = oldFormatTime.split(" ")
        var oldFormatTimeArray = dt[1].split(":");
    
        var HH = parseInt(oldFormatTimeArray[0]);
        var min = oldFormatTimeArray[1];
    
        var AMPM = HH >= 12 ? "P.M." : "A.M.";
        var hours;
        if(HH === 0){
          hours = HH + 12;
        } else if (HH > 12) {
          hours = HH - 12;
        } else {
          hours = HH;
        }
        var newFormatTime = hours + ":" + min + " " + AMPM;

        return newFormatTime
    }

    function formatDate(dt){
        const dtArr = dt.split("-")
        const d = dtArr[2]
        const m = dtArr[1]
        const y = dtArr[0]

        var month

        switch(m){
            case "01":
                month = "Jan."
                break
            case "02":
                month = "Feb."
                break
            case "03":
                month = "March"
                break
            case "04":
                month = "April"
                break
            case "05":
                month = "May"
                break
            case "06":
                month = "June"
                break
            case "07":
                month = "July"
                break
            case "08":
                month = "August"
                break
            case "09":
                month = "Sept."
                break
            case "10":
                month = "Oct."
                break
            case "11":
                month = "Nov."
                break
            case "12":
                month = "Dec."
                break
            
            default:
                month = ""
        }

        return d + " " + month + ", " + y
    }

    return (
        <div className="container mt-4">
            <h3 className='text-center' style={{ color: "orange" }}>Quiz - {quiz_id} Details </h3>
            {attemptedList.length === 0 ? (
                <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No one has attempted this quiz so far !!</h4>
                </>
            ) : (
                <>
                    <table className="table table-bordered mt-4 text-center">
                        <thead>
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">PRN</th>
                                <th scope="col">IP Address</th>
                                <th scope="col">ISP</th>
                                <th scope="col">Location</th>
                                <th scope="col">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attemptedList.map((val, key) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{key + 1}</th>
                                            <td>{val.prn}</td>
                                            <td>{val.ip_addr}</td>
                                            <td>{val.isp}</td>
                                            <td>{val.city}, {val.region_name}, {val.country} <br /> <span style={{fontWeight: "bold"}}>Latitude:</span> {val.lat} <br /> <span style={{fontWeight: "bold"}}>Longitude:</span> {val.lon}</td>
                                            <td><span style={{fontWeight: "bold"}}>Date:</span> {formatDate(val.my_ts.split(" ")[0])} <br /> <span style={{fontWeight: "bold"}}>Time:</span> {convertTo12Hour(val.my_ts)}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}

export default AttemptedStudents