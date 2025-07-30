import React, { useEffect } from 'react'
import { useState } from 'react'
function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    useEffect(()=>{
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, [])
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl md:text-7xl font-bold'>{new Date().toLocaleTimeString()}</h1>
      <p className='text-sm md:text-md font-medium'>{new Date().toLocaleDateString()}</p>
    </div>
  )
}

export default Clock
