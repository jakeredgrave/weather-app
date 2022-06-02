const api = {
  key: "863fee40b865ab802e428110f41ab09e",
  base: "https://api.openweathermap.org/data/3.0/",
};

function App() {
  return (
    <div className="container">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
      </main>
    </div>
  );
}

export default App;
