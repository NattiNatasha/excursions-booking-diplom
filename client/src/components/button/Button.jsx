import './Button.scss'

const SIZES = ['btn--medium', 'btn--large', 'btn--xl', 'btn--small', 'btn--xs']
const COLORS = ['btn--transparent', 'btn--black', 'btn--red', 'btn--green']
export const Button = ({
  children,
  type,
  onClick,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
  const checkButtonColor = COLORS.includes(buttonColor)
    ? buttonColor
    : COLORS[0]

  return (
    <button
      className={`btn ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
