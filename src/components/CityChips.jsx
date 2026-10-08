export default function CityChips({ cities, onSelect }) {
  return (
    <div className="popular-cities">
      {cities.map(({ name, flag }) => (
        <button key={name} type="button" className="city-chip" onClick={() => onSelect(name)}>
          <span aria-hidden="true">{flag}</span> {name}
        </button>
      ))}
    </div>
  )
}
