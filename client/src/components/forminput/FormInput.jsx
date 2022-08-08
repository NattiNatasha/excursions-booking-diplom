import './FormInput.scss'

const SIZES = [
  'input--medium',
  'input--small',
  'input--large',
  'input--noborder',
]

const FormInput = ({
  type,
  placeholder,
  inputSize,
  onChange,
  onBlur,
  min,
  max,
}) => {
  const checkInputSize = SIZES.includes(inputSize) ? inputSize : SIZES[0]

  return (
    <input
      min={min}
      max={max}
      className={`${checkInputSize}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default FormInput
