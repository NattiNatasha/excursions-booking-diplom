import { Button } from '../button/Button'
import './Dropdown.scss'

const Dropdown = ({ title, options, onClick }) => {
  return (
    <div className="dropdown">
      <Button type="button" buttonColor={'btn--black'}>
        {title}
      </Button>
      <div className="dropdown__content">
        {options.map((option) => (
          <span onClick={() => onClick(option)} key={option.id}>
            {option.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
