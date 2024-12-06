import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const maxVisiblePages = 5;

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (page) => {
    setSearchParams({ page });
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  return (
    <footer className="container-footer">
      <div className="ais-Pagination">
        <ul className="ais-Pagination-list">
          <li
            className={`ais-Pagination-item ais-Pagination-item--previousPage ${
              currentPage === 1 ? 'ais-Pagination-item--disabled' : ''
            }`}
          >
            <span
              className="ais-Pagination-link"
              aria-label="Previous Page"
              onClick={handlePrevious}
            >
              ‹
            </span>
          </li>

          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`ais-Pagination-item ais-Pagination-item--page ${
                currentPage === page ? 'ais-Pagination-item--selected' : ''
              }`}
            >
              <span
                className="ais-Pagination-link"
                aria-label={`Page ${page}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </span>
            </li>
          ))}

          <li
            className={`ais-Pagination-item ais-Pagination-item--nextPage ${
              currentPage === totalPages ? 'ais-Pagination-item--disabled' : ''
            }`}
          >
            <span
              className="ais-Pagination-link"
              aria-label="Next Page"
              onClick={handleNext}
            >
              ›
            </span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Pagination;
