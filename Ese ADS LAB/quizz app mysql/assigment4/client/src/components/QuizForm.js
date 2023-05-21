import React from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

var counter = 1

const QuizForm = () => {
  let navigate = useNavigate()

  const [quizID, setQuizID] = useState("")
  const [quizTimer, setQuizTimer] = useState("")
  const [que, setQue] = useState("")
  const [optA, setOptA] = useState("")
  const [optB, setOptB] = useState("")
  const [optC, setOptC] = useState("")
  const [optD, setOptD] = useState("")
  const [ans, setAns] = useState("")

  const [queList, setQueList] = useState([])

  const addQue = (e) => {
    e.preventDefault()

    document.getElementById("quiz-id").disabled = true
    document.getElementById("quiz-timer").disabled = true

    setQueList([
      ...queList,
      {
        id: counter,
        quiz_timer: quizTimer,
        que: que,
        optA: optA,
        optB: optB,
        optC: optC,
        optD: optD,
        ans: ans
      },
    ])

    counter++
    setQue("")
    setOptA("")
    setOptB("")
    setOptC("")
    setOptD("")
    setAns("")
  }

  const deleteItem = (id) => {
    setQueList(
      queList.filter((val) => {
        return val.id !== id;
      })
    );
  }

  const createQuiz = () => {
    const t_id = localStorage.getItem("t_id")

    Axios.post("http://localhost:3001/create/quiz", {
      quiz_id: quizID,
      quiz_timer: quizTimer,
      queList: queList,
      t_id: t_id
    }).then((response) => {
      if (response.data.error) {
        window.alert(response.data.error)
      } else {
        navigate("/")
      }
    });
  }

  return (
    <div className="container mt-4">
      <h3>Create Quiz</h3>
        <form onSubmit={(e) => {addQue(e)}}>
        <div className="form-group">
          <label>Quiz ID</label>
          <input required={true} type="number" className="form-control" id="quiz-id" placeholder="Enter Quiz ID" value={quizID} onChange={(event) => {
            setQuizID(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Quiz Timer (in min.)</label>
          <input required={true} type="number" className="form-control" id="quiz-timer" placeholder="Enter Time for Quiz (in min.)" value={quizTimer} onChange={(event) => {
            setQuizTimer(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Question</label>
          <input maxLength={255} required={true} type="text" className="form-control" placeholder="Enter Question" value={que} onChange={(event) => {
            setQue(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Option A</label>
          <input maxLength={255} required={true} type="text" className="form-control" placeholder="Enter Option A" value={optA} onChange={(event) => {
            setOptA(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Option B</label>
          <input maxLength={255} required={true} type="text" className="form-control" placeholder="Enter Option B" value={optB} onChange={(event) => {
            setOptB(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Option C</label>
          <input maxLength={255} required={true} type="text" className="form-control" placeholder="Enter Option C" value={optC} onChange={(event) => {
            setOptC(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Option D</label>
          <input maxLength={255} required={true} type="text" className="form-control" placeholder="Enter Option D" value={optD} onChange={(event) => {
            setOptD(event.target.value);
          }} />
        </div>
        <div className="form-group">
          <label>Answer</label>
          <select className='form-control' required={true} defaultValue={ans} onChange={(event) => {
            setAns(event.target.value);
          }}>
            <option value="" hidden={true} selected={true}>Choose Options</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <button type='submit' className="btn btn-primary">Add Question</button>
        </form>
      <hr />

      <div className="container mt-4">
        <h3 className='text-center' style={{ color: "orange" }}>Questions</h3>
        {queList.length === 0 ? (
          <>
            <hr />
            <h4 className='text-danger text-center mt-4'>No questions added!</h4>
          </>
        ) : (

          <>
            <table className="table table-bordered mt-4 text-center">
              <thead>
                <tr>
                  <th scope="col">Question No.</th>
                  <th scope="col">Question</th>
                  <th scope="col">Option A</th>
                  <th scope="col">Option B</th>
                  <th scope="col">Option C</th>
                  <th scope="col">Option D</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {queList.map((val, key) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{key + 1}</th>
                        <td>{val.que}</td>
                        <td>{val.optA}</td>
                        <td>{val.optB}</td>
                        <td>{val.optC}</td>
                        <td>{val.optD}</td>
                        <td className='text-success' style={{ fontWeight: "bold" }}>{val.ans}</td>
                        <td><button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(key + 1) }}>&#128465; Delete</button></td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </table>

            <button onClick={createQuiz} style={{ height: "fit-content", width: "fit-content", marginLeft: "auto" }} className='btn btn-success'>Create Quiz</button>
          </>
        )}
      </div>
    </div>
  )
}

export default QuizForm