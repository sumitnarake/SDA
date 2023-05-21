import React from 'react';
import Question from './Question';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Axios from "axios";
import Timer from './Timer';

var id

const DisplayQue = () => {
  let navigate = useNavigate()

  const [quizList, setQuizList] = useState([]);
  const [selectedOpts, setSelectedOpts] = useState([])

  const prn = localStorage.getItem("prn")

  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event || window.event
      e.preventDefault()

      if (e) {
        e.returnValue = ''
        localStorage.clear()
      }

      return ''
    }
  })

  useEffect(() => {
    id = prompt("Enter Quiz ID:")

    if (id == null) {
      navigate("/")
      return
    }

    if (id.length === 0) {
      alert("Quiz ID cannot be null!")
      navigate("/")
      return
    }

    Axios.get(`http://localhost:3001/get/quiz/${id}`).then((response) => {
      if (response.data.length === 0) {
        alert("No Quiz with such ID exists!");
        navigate("/")
      }
      else {
        Axios.get(`http://localhost:3001/result/${prn}/${id}`).then((res) => {
          if (res.data.length === 0) {
            const quiz_id = response.data[0]['quiz_id']

            Axios.post("http://localhost:3001/result/init", {
              prn: prn,
              quizID: quiz_id
            }).then((resp) => {
              fetch("http://ip-api.com/json/?fields=country,regionName,city,isp,query,lat,lon")
                .then((res) => res.json())
                .then((res) => {
                  var ip_addr, country, region_name, city, isp, lat, lon
                  ip_addr = res.query
                  country = res.country
                  region_name = res.regionName
                  city = res.city
                  isp = res.isp
                  lat = res.lat
                  lon = res.lon

                  Axios.post("http://localhost:3001/attempts/init", {
                    prn: prn,
                    quiz_id: quiz_id,
                    ip_addr: ip_addr,
                    country: country,
                    region_name: region_name,
                    city: city,
                    isp: isp,
                    lat: lat,
                    lon: lon
                  })
                })
            })
          }
          else {
            alert("You have already attempted this quiz !!");
            navigate("/")
          }
        }).then((r) => setQuizList(response.data))
      }
    });
  }, [])

  const submitQuiz = () => {
    const quizID = quizList[0]['quiz_id']

    Axios.post(`http://localhost:3001/quiz/submit`, {
      prn: prn,
      quiz_id: quizID,
      selectedOpts: selectedOpts
    }).then((response) => {
      alert("You have submitted the quiz successfully!")
      navigate("/")
    });
  }

  return (
    <div>
      <h3 className='text-center mt-4'>MCQ Quiz</h3>

      {quizList.map((v, k) => {
        if (k + 1 === 1) {
          return (

            <div style={{ fontSize: "2rem" }} className='user-select-none'><span style={{ fontWeight: "bold" }} className='text-danger'>Timer:</span> <Timer submitQuiz={submitQuiz} quizTimer={v.quiz_timer} /></div>
          )
        }
        else {
          return <></>
        }
      })}

      {quizList.map((val, key) => {
        return (
          <>
            <Question q_id={val.q_id} selectedOpts={selectedOpts} setSelectedOpts={setSelectedOpts} quesLen={quizList.length} qid={key + 1} que={val.question} a={val.opt_a} b={val.opt_b} c={val.opt_c} d={val.opt_d} />
          </>
        )
      })}

      <div className='container'>
        <button className="btn btn-success" onClick={submitQuiz}>Submit</button>
      </div>

    </div>
  )
}

export default DisplayQue;