import React from 'react'

// const forecast = [
//     {temperature: "24°C", day: "Monday", date: "1 Sep", icon: "☀️"},
//     {temperature: "26°C", day: "Tuesday", date: "2 Sep", icon: "🌤️"},
//     {temperature: "22°C", day: "Wednesday", date: "3 Sep", icon: "🌥️"},
//     {temperature: "25°C", day: "Thursday", date: "4 Sep", icon: "🌤️"},
//     {temperature: "23°C", day: "Friday", date: "5 Sep", icon: "🌦️"},
// ]

// const hourlyForecast = [
//   {time: "12:00 PM", degree: "24°C", icon: "☀️", windSpeed: "3.4 km/h"},
//   {time: "1:00 PM", degree: "25°C", icon: "🌤️", windSpeed: "3.0 km/h"},
//   {time: "2:00 PM", degree: "26°C", icon: "🌤️", windSpeed: "2.8 km/h"},
//   {time: "3:00 PM", degree: "27°C", icon: "🌤️", windSpeed: "2.5 km/h"},
// ]



function Forecast({forecast}) {

  const dailyForecast = forecast.reduce((acc, item)=>{
  const date = new Date(item.dt * 1000).toLocaleDateString();
  if(!acc.find(f => f.date === date)){
    acc.push({
      temperature: `${item.main.temp}°C`,
      day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      date: date,
      icon:`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    })
  }
  return acc;
},[]).slice(0, 5);

const hourlyForecast = forecast.slice(0,5).map((item)=>({
  time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
  degree: `${item.main.temp}°C`,
  windSpeed: `${item.wind.speed} km/h`
}))
  return (
    <div className='flex'>
      <div className='xl:w-96 w-full h-1/2 px-4 py-4 bg-[#050e1fde] shadow-2xl shadow-black m-4 mt-10 rounded-lg text-white '>
        <h2 className='flex items-center justify-center font-bold text-2xl'>5 Days Forecast</h2>
        {
            dailyForecast.map((cast, index)=>(
                <div key={index} className='flex flex-row justify-between items-center p-2'>
                    <h1>{cast.day}</h1>
                    <h1>Temperature: {cast.temperature}</h1>
                    <h1>{cast.date}</h1>
                    <img src={cast.icon} alt="icon" className='select-none h-16 w-16' />
                </div>
            ))
        }
      </div>
      <div className='flex-grow h-auto px-4 bg-[#050e1fde] shadow-2xl shadow-black m-4 mt-10 rounded-lg text-white hidden lg:block'>
        <h1 className='text-2xl font-bold mb-4 flex items-center justify-center '>Hourly Forecast</h1>
        <div className='flex justify-around items-center gap-4 h-54 mt-14'>
          {hourlyForecast.map((hourCast, index)=>(
            <div key={index} className='flex flex-col items-center gap-5 bg-[#1c2938] rounded-lg p-4 w-28 text-center shadow-md'>
              <p className='text-sm font-medium'>{hourCast.time}</p>
              <img src={hourCast.icon} alt="icon" className='select-none w-16 h-16' />
              <p>{hourCast.degree}</p>
              <p>{hourCast.windSpeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Forecast
