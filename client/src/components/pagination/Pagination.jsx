import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import './Pagination.scss'

const Pagination = observer(() => {
  const { excursion } = useContext(Context)
  const pageCount = Math.ceil(excursion.totalCount / excursion.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
        <span
          key={page}
          className={excursion.page === page ? 'activated' : ''}
          onClick={() => excursion.setPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  )
})

export default Pagination
