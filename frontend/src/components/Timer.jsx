import { useState, useEffect } from 'react';
import axios from 'axios';

export const ToMinutesHours = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);  
  const hours = Math.floor(minutes / 60);
  const remainingSeconds = totalSeconds % 60;    
  return {hours, minutes, remainingSeconds};
};


export default function Timer() {
  const [startTime, setStartTime] = useState(null); 
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false); 
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1); 
      }, 1000);
      setIntervalId(id); 
    }
    return () => clearInterval(intervalId); 
  }, [isActive]); 

  const startTimer = () => {
    setStartTime(new Date());
    setIsActive(true);        
  };

  const stopTimer = () => {
    if (startTime) {
      setIsActive(false);    
      const now = new Date(); 
      const timeDiff = Math.floor((now - startTime) / 1000); 
      setElapsedTime(0); 
      clearInterval(intervalId);

      sendTimeToBackend(timeDiff, startTime, now);
      window.location.reload()
    }

  };

  const sendTimeToBackend = async (duration, start, end) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACK_URI}/Timer/SetTime`, {
        Duration: duration,         
        Start: start,               
        End: end                  
      }, {withCredentials:true});
    } catch (error) {
      console.error('sendTime error', error);
    }
  };

  
  return (
    <div className='timer-container'>
      <label className='timer-container__lbl'>Work time</label>
      <strong className='timer-container__time'>
        <span>{ToMinutesHours(elapsedTime).hours}</span>h 
        <span> {ToMinutesHours(elapsedTime).minutes}</span>m 
        <span> {ToMinutesHours(elapsedTime).remainingSeconds}</span>s
      </strong>
      <div className='timer-container__options'>
        <button className='timer-container__options--start' onClick={startTimer} disabled={isActive}>
          <span className="material-symbols-outlined">
            play_arrow
          </span>
        </button >
        <button className='timer-container__options--stop' onClick={stopTimer} disabled={!isActive}>
          <span className="material-symbols-outlined">
            stop
          </span>
        </button>
      </div>
    </div>
  );
}
 
