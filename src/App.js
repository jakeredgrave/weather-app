import { useState } from "react";

const api = {
  key: "863fee40b865ab802e428110f41ab09e",
  base: "https://api.openweathermap.org/data/2.5/",
  geo: "http://api.openweathermap.org/geo/1.0/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    e.preventDefault();

    // Get cordinates by name
    fetch(`${api.geo}direct?q=${query}&limit=1&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        // console.log(result[0].lat);

        // Fetching location
        fetch(
          `${api.base}weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${api.key}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setQuery("");
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
    <div className="container">
      <main>
        <div className="search-box">
          <form onSubmit={search}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
        <div className="location-box">
          <div className="location">{weather.name}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{}°C</div>
          <div className="weather">Sunny</div>
        </div>
      </main>
    </div>
  );
}

export default App;
