import { GiWaterDrop } from "react-icons/gi";

const WeatherResults = ({ weather, dateBuilder, loading }) => {
  if (!loading) {
    return (
      <>
        <div className="location-box">
          <div className="location">
            {weather.name} {weather.sys.country}
          </div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        <div className="details-box">
          <div className="pressure">{weather.main.pressure} hPa</div>
          <div className="humidity">
            <GiWaterDrop fill="#023047" />
            {weather.main.humidity}%
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default WeatherResults;
