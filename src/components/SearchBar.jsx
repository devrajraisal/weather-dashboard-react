export default function SearchBar({ value, onChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label htmlFor="city-input" className="visually-hidden">City name</label>
      <input
        id="city-input"
        className="city-input"
        type="text"
        placeholder="Enter city name..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button className="search-btn" type="submit">Search</button>
    </form>
  )
}
