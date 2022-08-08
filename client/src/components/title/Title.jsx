import './Title.scss'

const Title = ({ title, addition }) => {
  return (
    <>
      <h2 className="heading">
        {title} <span>{addition}</span>
      </h2>
    </>
  )
}

export default Title
