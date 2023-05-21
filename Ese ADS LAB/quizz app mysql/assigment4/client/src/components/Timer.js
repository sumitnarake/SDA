import React from 'react'
import { useEffect, useState } from 'react'

const Timer = (props) => {
    const  [minutes, setMinutes] = useState(props.quizTimer)
    const  [seconds, setSeconds] = useState(0)

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0){
                setSeconds(seconds-1)
            }

            if (seconds === 0){
                if(minutes === 0){
                    props.submitQuiz()
                }
                else{
                    setMinutes(minutes-1)
                    setSeconds(59)
                }
            }
        }, 1000)

        return () => {
            clearInterval(myInterval)
        }
    })

  return (
    <>
        {minutes === 0 && seconds === 0 ?
         null 
         : <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span> }
    </>
  )
}

export default Timer