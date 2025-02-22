import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChangePage,
}) => {
  if (totalPages <= 1) return null

  const handlePrev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Prev
      </button>

      <span className="mx-2">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  )
}

export default Pagination
