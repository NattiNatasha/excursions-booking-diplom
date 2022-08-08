import './Select.scss'

const Select = ({ value, options, onClick }) => {
  return (
    <div className="select">
      <select value={value}>
        {options.map((option) => (
          <option
            onClick={() => {
              onClick(option)
            }}
            key={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
