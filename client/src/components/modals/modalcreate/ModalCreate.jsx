import * as AiIcons from 'react-icons/ai'
import { Button } from '../../button/Button'
import './ModalCreate.scss'

const ModalCreate = ({
  title,
  type,
  isOpen,
  setIsOpen,
  placeholder,
  onClick,
  value,
  onChange,
}) => {
  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2 className="modal__header-title">{title}</h2>
              <AiIcons.AiOutlineClose
                className="modal-close"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="modal__body">
              <form>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
              </form>
            </div>
            <div className="modal__footer">
              <Button
                buttonColor={'btn--green'}
                buttonSize={'btn--small'}
                onClick={onClick}
              >
                Добавить
              </Button>
              <Button
                buttonColor={'btn--red'}
                buttonSize={'btn--small'}
                onClick={() => setIsOpen(false)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalCreate
