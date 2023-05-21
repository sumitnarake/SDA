import React, { useState } from 'react';
import './question.css';

const Question = (props) => {
    const [opt, setOpt] = useState("")

    const handleSave = (qid) => {
        const clr = document.getElementById(`clr_${qid}`)
        const sv = document.getElementById(`sv_${qid}`)
        
        clr.disabled = true
        sv.disabled = true

        clr.classList.add("disabled", "btn-disabled")
        sv.classList.add("disabled", "btn-disabled")

        const r = document.getElementsByName(qid)
        const lb = document.getElementsByName(qid)
        for(var i=0; i<r.length; i++){
            r[i].disabled = true
            lb[i].classList.add("btn-disabled")
        }

        props.setSelectedOpts([
            ...props.selectedOpts,
            {
                q_id: props.q_id,
                selected_opt: opt
            }
        ])
    }

    const handleClear = () => {
        const r = document.getElementsByName(props.q_id)
        for(var i=0; i<r.length; i++){
            r[i].checked = false
        }

        setOpt("")
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-10 col-lg-10">
                        <div className="border" style={{borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}>
                            <div className="question p-3 border-bottom" style={{backgroundColor: "orange", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"}}>
                                <div className="text-center mcq">
                                    <span className='text-white' style={{fontWeight: "bold"}}>{props.qid} of {props.quesLen}</span>
                                </div>
                            </div>
                            <div className="question p-3 border-bottom" style={{backgroundColor: "#fff7e7"}}>
                                <div className="d-flex flex-row align-items-center question-title">
                                    <h3 className="text-danger">Q.{props.qid}.</h3>
                                    <h5 className="mt-1 ml-2 user-select-none">{props.que}</h5>
                                </div>
                                <div className="ans ml-2 user-select-none" onChange={(e) => {setOpt(e.target.value)}}>
                                    <label name={props.qid} className="radio"> <input type="radio" name={props.qid} value="A" /> <span>{props.a}</span></label>
                                    <br />
                                    <label name={props.qid} className="radio"> <input type="radio" name={props.qid} value="B" /> <span>{props.b}</span></label>
                                    <br />
                                    <label name={props.qid} className="radio"> <input type="radio" name={props.qid} value="C" /> <span>{props.c}</span></label>
                                    <br />
                                    <label name={props.qid} className="radio"> <input type="radio" name={props.qid} value="D" /> <span>{props.d}</span></label>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center p-3" style={{backgroundColor: "#ab0092"}}>
                                <button id={`clr_${props.qid}`} style={{height: "fit-content", width: "fit-content"}} className="btn btn-danger" onClick={handleClear}>Clear</button>
                                <button id={`sv_${props.qid}`} style={{height: "fit-content", width: "fit-content"}} className="btn btn-success" onClick={() => {handleSave(props.qid)}}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;