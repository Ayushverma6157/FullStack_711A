export default function Hero({ keyword, location, onKeywordChange, onLocationChange, onSearch }) {
  return (
    <section className="hero">
      <h1>Find Your <span>Dream Job</span></h1>
      <p>Search thousands of jobs from top companies</p>

      <div className="search-box">
        <input
          type="text"
          id="search-keyword"
          placeholder="Job title or keyword"
          value={keyword}
          onChange={e => onKeywordChange(e.target.value)}
        />
        <input
          type="text"
          id="search-location"
          placeholder="Location"
          value={location}
          onChange={e => onLocationChange(e.target.value)}
        />
        <button id="search-btn" onClick={onSearch}>Search Jobs</button>
      </div>
    </section>
  );
}
