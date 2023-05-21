import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from "axios";

const ViewResult = () => {
    const { qid } = useParams()

    const [result, setResult] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/get/result/${qid}`).then((response) => {
            setResult(response.data)
        });

    }, [])

  return (
    <div className='container mt-4'>
        <h3 className='text-center'>Result</h3>

        {result.length === 0 ? (
        <>
          <hr />
          <h4 className='text-danger text-center mt-4'>No one has attempted this quiz yet !!</h4>
        </>
      ) : (

        <>
          <table className="table table-bordered mt-4 text-center">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">PRN</th>
                <th scope="col">Marks (out of {result[0]['out_of']})</th>
              </tr>
            </thead>
            <tbody>
              {result.map((val, key) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{key + 1}</th>
                      <td>{val.prn}</td>
                      <td>{val.marks}</td>
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

export default ViewResult