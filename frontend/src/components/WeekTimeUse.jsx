import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToMinutesHours } from './Timer';

export default function WeekTimeUse() {

  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACK_URI}/Timer/WeekTimerUse`, {withCredentials:true});
        setWeeklyData(response.data);
      } catch (error) {
        console.error('get weekly data error', error);
      }

    };

    fetchWeeklyData();
  }, []);

  return (
    <div className='weekUssage-container'>
      <label className='weekUssage-container__lbl'>time spent this week:</label>
      <ul className='weekUssage-container__sub-container'>
        {weeklyData.length > 0 ? (weeklyData.map((day, index) => (
          <li className='weekUssage-container__sub-container--day' key={index}>
              <label>{new Date(day.day).toLocaleDateString()}</label>
              <strong>
                {ToMinutesHours(day.totalDuration).hours}h 
                {ToMinutesHours(day.totalDuration).minutes}mins
              </strong>
          </li>
        )))
        : (
          <p style={{textAlign:'center'}}>You dont have any time worked yet</p>
        )
        }
      </ul>
    </div>
  );
}
