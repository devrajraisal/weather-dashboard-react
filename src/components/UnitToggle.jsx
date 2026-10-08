export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Temperature unit">
      {['C', 'F'].map((u) => (
        <button key={u} type="button" aria-pressed={unit === u} onClick={() => onChange(u)}>
          °{u}
        </button>
      ))}
    </div>
  )
}
