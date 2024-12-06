import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpHelper } from '../../helpers/httpHelper';
import SortOptions from './SortOptions';
import ItemList from './ItemList';
import Pagination from './Pagination';
import EmptyList from './EmptyList';
import './ResultsContainer.css';
import './SortOptions.css';
import './ItemList.css';
import './ItemCard.css';
import './Pagination.css';
import './EmptyList.css';

const ResultsContainer = () => {
  const [items, setItems] = useState([]);
  const [sortValue, setSortValue] = useState('');
  const [hitsPerPage, setHitsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { get } = httpHelper();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query') || '';
        const sort = searchParams.get('sort') || '';
        const rating = searchParams.get('rating') || '';
        const freeShipping = searchParams.get('free_shipping') === 'true';
        const brands = searchParams.getAll('brands');
        const price = searchParams.get('price') || '';
        const pathSegments = location.pathname.split('/').slice(2); // Get category and subcategory from URL
        const category = pathSegments[0] || '';
        const subcategory = pathSegments[1] || '';

        let url = `http://localhost:5000/products?`;
        if (query) {
          url += `&name_like=${query}&description_like=${query}`;
        }
        if (rating) {
          url += `&rating=${rating}`;
        }
        if (freeShipping) {
          url += `&free_shipping=true`;
        }
        if (brands.length > 0) {
          brands.forEach((brand) => {
            url += `&brand=${brand}`;
          });
        }
        if (price) {
          const [minPrice, maxPrice] = price.split(':').map(Number);
          if (minPrice) {
            url += `&price_gte=${minPrice}`;
          }
          if (maxPrice) {
            url += `&price_lte=${maxPrice}`;
          }
        }
        if (subcategory) {
          url += `&categories_like=${subcategory}`;
        } else if (category) {
          url += `&categories_like=${category}`;
        }
        if (sort === 'price_asc') {
          url += '&_sort=price&_order=asc';
        } else if (sort === 'price_desc') {
          url += '&_sort=price&_order=desc';
        } else {
          // url += '&_sort=popularity&_order=asc';
        }
        const data = await get(url);
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search, location.pathname]);

  const totalPages = Math.ceil(items.length / hitsPerPage);

  const handleSortChange = (e) => {
    const newSortValue = e.target.value;
    setSortValue(newSortValue);
    const searchParams = new URLSearchParams(location.search);
    if (newSortValue) {
      searchParams.set('sort', newSortValue);
    } else {
      searchParams.delete('sort');
    }
    navigate({ search: searchParams.toString() });
  };

  const handleHitsChange = (e) => setHitsPerPage(Number(e.target.value));
  const handlePageChange = (page) => setCurrentPage(page);

  const displayedItems = items.slice(
    (currentPage - 1) * hitsPerPage,
    currentPage * hitsPerPage
  );

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';

  return (
    <section className="container-results">
      <SortOptions
        sortValue={sortValue}
        onSortChange={handleSortChange}
        hitsPerPage={hitsPerPage}
        onHitsChange={handleHitsChange}
      />
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length > 0 && (
        <ItemList items={displayedItems} searchQuery={searchQuery} />
      )}
      {!loading && !error && items.length === 0 && (
        <EmptyList />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ResultsContainer;
