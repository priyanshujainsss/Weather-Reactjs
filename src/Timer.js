import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [time,setTime]=useState(new Date().toLocaleTimeString())
    useEffect(()=>{
       setInterval(()=>{
          setTime(new Date().toLocaleTimeString())
       },[1000])
    },[])
    return (
        <div>
      <div className="timer" >{time}</div>      
        </div>
    )
}

export default Timer
