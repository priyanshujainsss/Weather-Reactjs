import React, { useEffect, useState } from "react";
import "./weatherstyle.css";
import Timer from "./Timer";
const Weather = () => {
  const [cityname, setcityname] = useState('pune')
   const [tempInfo, settempInfo] = useState({});
   const [weatherState,setWeatherState]=useState("");

  const getWeather = async () => {
    try {
      let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=43b55c70384dd45edaf5423379909a67`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const { temp,humidity,pressure}= data.main;
      const {main : weathermood} =  data.weather[0];
      const {name}= data;
      const {speed}=  data.wind;
      const {country,sunset}=  data.sys;

      const sec=sunset;
      let date=new Date(sec*1000);
      let timeStr=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      console.log(timeStr);

      const myNewWeatherInfo={
          temp,humidity,pressure,weathermood,name,speed,country,timeStr
      }
     settempInfo(myNewWeatherInfo);
      console.log(tempInfo)
    } catch (err) {
      alert("City not found")
    }
  };
 console.log("weather component")
 useEffect(()=>{
   if(tempInfo.weathermood){
       switch(tempInfo.weathermood){
           case "Clouds":
               setWeatherState("wi-day-cloudy");
               break;
           case "Haze":
               setWeatherState("wi-fog");
               break;
            case "Rain":
               setWeatherState("wi-rain");
               break;
            case "Clear":
                setWeatherState("wi-day-sunny");
                break;
             default :
             setWeatherState("wi-day-sunny");
             break;   
            }
   }
 

 },[tempInfo.weathermood])


  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={cityname}
            onChange={(e)=>setcityname(e.target.value)}
            onKeyPress={(e)=>e.key=="Enter"?getWeather():null}

          />
          <button className="searchButton" type="button" onClick={getWeather}   >
            Search
          </button>
        </div>
      </div>
      {/* <div className="timer" >{new Date().toLocaleTimeString()}</div> */}
      <Timer />

      <article className="widget">
        <div className="weatherIcon">
          <i className={`${weatherState}`}></i>
        <i className={"wi wi-refresh refreshbutton"}  onClick={getWeather}  ></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{tempInfo.temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">
                {tempInfo.weathermood}</div>
            <div className="place">{tempInfo.name}, {tempInfo.country} </div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()} </div>

        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.timeStr} <br />
                Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.humidity} <br />
                Humidity
              </p>
            </div>
          </div>
            <div className="weather-extra-info" >
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.pressure}<br />
                Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {tempInfo.speed} <br />
                Speed
              </p>
            </div>
            </div>
        </div>
      </article>
    </div>
  );
};

export default Weather;
