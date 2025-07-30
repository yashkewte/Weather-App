import React, { useState, useEffect } from 'react';
import { TiWeatherPartlySunny } from "react-icons/ti";
import Clock from "./Clock";
import { WiSunrise, WiSunset, WiHumidity } from "react-icons/wi";
import { IoIosSunny } from "react-icons/io";
import { LuWind } from "react-icons/lu";
import { BsSpeedometer } from "react-icons/bs";
import { MdShutterSpeed } from "react-icons/md";
import Forecast from "./Forecast";
import { toast } from 'react-toastify';
import axios from 'axios';

function CityAndTime({ cityName, lat, lon, setLat, setLon }) {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [uvIndex, setUvIndex] = useState(null)

  // Fetch weather data based on cityName, lat, and lon
  const fetchData = async () => {
    try {
      const encodedCity = encodeURIComponent(cityName);
      let url;
      if (encodedCity) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      } else {
        toast.error("No location provided");
        return
      }

      const currentWeather = await axios.get(url);
      setWeatherData(currentWeather.data);

      const { coord } = currentWeather.data;
      setLat(coord.lat);
      setLon(coord.lon);

      const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
      setForecastData(forecast.data)

      const uv = await axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${coord.lat}&lon=${coord.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
      setUvIndex(uv.data.value)

    } catch (error) {
      console.error("Error fetching weather data:", error);

    }
  }

  useEffect(() => {
    if (!cityName && (!lat || !lon)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
        fetchData(latitude, longitude);
      },
        (error) => {
          console.log("Error getting location:", error);
          toast.error("Unable to retrieve your location. Please provide a city name or coordinates.");
        }
      )
    }
    else {
      fetchData(lat, lon);
    }
  }, [cityName, lat, lon, setLat, setLon]);



  if (!weatherData || !forecastData || uvIndex === null) {
    return <div className="flex items-center justify-center text-2xl md:text-6xl text-white text-center">Loading...</div>;
  }

  const { main, weather, sys, wind } = weatherData;
  const { list } = forecastData

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-4">
        {/* left section */}
        <div className="w-full xl:w-1/3 h-auto md:h-72 bg-[#050e1fde] shadow-2xl shadow-black rounded-lg text-white p-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-3xl font-bold">{cityName || weatherData.name}</h1>
          <TiWeatherPartlySunny size={60} color="yellow" className="select-none" />
          <Clock />
        </div>
        {/* right section */}
        <div className="flex-grow h-auto md:h-72 bg-[#050e1fde] shadow-2xl rounded-lg text-white p-4 flex flex-col justify-around md:flex-row items-center md:items-stretch gap-4">
          {/* temperature and sunrise/sunset info */}
          <div className="flex flex-col items-center justify-between xl:justify-center gap-6 md:gap-4">
            <h1 className="text-5xl md:text-7xl font-bold">{(main.temp)}<sup>o</sup>C </h1>
            <p className="text-center">Feels like: <span className="text-lg md:text-xl ml-2 font-bold">{main.feels_like}<sup>o</sup>C</span></p>

            <div className="flex xl:flex-col md:flex-row justify-center items-center gap-4">
              <div className="flex items-center gap-2">
                <WiSunrise size={28} color="yellow" className="h-8 md:h-10 select-none" />
                <div className="text-center">
                  <h6>Sunrise</h6>
                  <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <WiSunset size={28} color="yellow" className="h-8 md:h-10 select-none" />
                <div className="text-center">
                  <h6>Sunset</h6>
                  <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Main weather icon */}
          <div className="flex flex-col justify-center items-center">
            <IoIosSunny color="yellow" className="w-36 h-36 md:w-52 md:h-52 select-none" />
            <p className="font-bold text-xl md:text-3xl">{weather[0].description}</p>
          </div>
          {/* additional info */}
          <div className="md:grid md:grid-cols-2 flex flex-row justify-between gap-4 md:p-4">
            <div className="flex flex-col items-center gap-2">
              <WiHumidity color="yellow" className="h-8 w-8 md:h-10 md:w-10 select-none" />
              <p>{main.humidity} %</p>
              <h6>Humidity</h6>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LuWind color="yellow" className="h-8 w-8 md:h-10 md:w-10 select-none" />
              <p>{wind.speed} km/h</p>
              <h6>Wind Speed</h6>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BsSpeedometer color="yellow" className="h-8 w-8 md:h-10 md:w-10 select-none" />
              <p>{main.pressure} hPa</p>
              <h6>Pressure</h6>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MdShutterSpeed color="yellow" className="h-8 w-8 md:h-10 md:w-10 select-none" />
              <p>{uvIndex !== null ? uvIndex : 'N/A'}</p>
              <h6>UV</h6>
            </div>
          </div>
        </div>
      </div>

      <Forecast forecast={list}/>
    </>
  )
}

export default CityAndTime
