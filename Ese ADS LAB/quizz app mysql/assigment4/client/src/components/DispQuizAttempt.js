import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"

const DispQuizAttempt = () => {
  const [myQuiz, setMyQuiz] = useState([])

  const tId = localStorage.getItem("t_id")

  useEffect(() => {
    Axios.get(`http://localhost:3001/get/my-quizes/${tId}`).then((response) => {
      setMyQuiz(response.data)
    });

  }, [])

  return (
    <div className='container mt-4'>
      <h3 className='text-center'>Your Quizes</h3>

      {myQuiz.length === 0 ? (
        <>
          <hr />
          <h4 className='text-danger text-center mt-4'>No quizes created so far !!</h4>
        </>
      ) : (

        <>
          <table className="table table-bordered mt-4 text-center">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Quiz ID</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {myQuiz.map((val, key) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{key + 1}</th>
                      <td style={{ fontWeight: "bold" }} className='text-success'>{val.quiz_id}</td>
                      <td><Link to={`/result/view/${val.quiz_id}`}><button className='btn btn-success' style={{ height: "fit-content", width: "fit-content" }}>View Result</button></Link></td>
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

export default DispQuizAttempt