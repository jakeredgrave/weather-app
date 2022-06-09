import { useState } from "react";

import Search from "./components/Search";
import WeatherResults from "./components/WeatherResults";
import Spinner from "./components/Spinner";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE = process.env.REACT_APP_API_BASE;
const API_GEO = process.env.REACT_APP_API_GEO;

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const search = (e) => {
    e.preventDefault();

    setLoading(true);

    // Get cordinates by name
    fetch(`${API_GEO}direct?q=${query}&limit=5&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // console.log(result[0].lat);

        // Fetching location

        fetch(
          `${API_BASE}weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setQuery("");
            setLoading(false);
            console.log(result);
          });
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "container warm"
            : "container cold"
          : "container"
      }
    >
      <main>
        <Search search={search} query={query} setQuery={setQuery} />

        {Object.keys(weather).length !== 0 && (
          <WeatherResults
            weather={weather}
            dateBuilder={dateBuilder}
            loading={loading}
          />
        )}
        {loading === true && <Spinner />}
      </main>
    </div>
  );
}

export default App;
