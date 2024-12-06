import React from 'react';

const SortOptions = ({ sortValue, onSortChange, hitsPerPage, onHitsChange }) => {
  return (
    <header className="container-header container-options">
      <div className="ais-SortBy container-option">
        <select
          className="ais-SortBy-select"
          value={sortValue}
          onChange={onSortChange}
          aria-label="Sort results by"
        >
          <option value="featured">Sort by featured</option>
          <option value="price_asc">Price ascending</option>
          <option value="price_desc">Price descending</option>
        </select>
      </div>
      <div className="ais-HitsPerPage container-option">
        <select
          className="ais-HitsPerPage-select"
          value={hitsPerPage}
          onChange={onHitsChange}
        >
          <option value="16">16 hits per page</option>
          <option value="32">32 hits per page</option>
          <option value="64">64 hits per page</option>
        </select>
      </div>
    </header>
  );
};

export default SortOptions;
