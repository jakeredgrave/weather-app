import { useState } from "react";

import Search from "./components/Search";
import WeatherResults from "./components/WeatherResults";
import Spinner from "./components/Spinner";

const api = {
  key: "863fee40b865ab802e428110f41ab09e",
  base: "https://api.openweathermap.org/data/2.5/",
  geo: "http://api.openweathermap.org/geo/1.0/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const search = (e) => {
    e.preventDefault();

    setLoading(true);

    // Get cordinates by name
    fetch(`${api.geo}direct?q=${query}&limit=5&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // console.log(result[0].lat);

        // Fetching location

        fetch(
          `${api.base}weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${api.key}&units=metric`
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
