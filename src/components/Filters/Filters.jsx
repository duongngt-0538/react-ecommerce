import React from 'react';
import CategoryFilter from './Filter/CategoryFilter';
import BrandsFilter from './Filter/BrandsFilter';
import PriceFilter from './Filter/PriceFilter';
import FreeShippingFilter from './Filter/FreeShippingFilter';
import RatingsFilter from './Filter/RatingsFilter';
import './Filters.css';
import './Filter/CategoryFilter.css';
import './Filter/BrandsFilter.css';
import './Filter/PriceFilter.css';
import './Filter/FreeShippingFilter.css';
import './Filter/RatingsFilter.css';

const Filters = () => {
  return (
    <div className="container-wrapper">
      <section className="container-filters">
        <div className="container-header">
          <h2>Filters</h2>
          <div className="clear-filters" data-layout="desktop">
            <a href='/search' className="ais-ClearRefinements-button">
              <div className="clear-filters">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
                  <g fill="none" fillRule="evenodd">
                    <path d="M0 0h11v11H0z"></path>
                    <path fill="#000" fillRule="nonzero" d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"></path>
                  </g>
                </svg>
                Clear filters
              </div>
            </a>
          </div>
        </div>
        <div className="container-body">
          <CategoryFilter />
          <BrandsFilter />
          <PriceFilter />
          <FreeShippingFilter />
          <RatingsFilter />
        </div>
      </section>
    </div>
  );
};

export default Filters;
