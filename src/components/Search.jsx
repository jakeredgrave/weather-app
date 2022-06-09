const Search = ({ search, query, setQuery }) => {
  return (
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
  );
};

export default Search;
