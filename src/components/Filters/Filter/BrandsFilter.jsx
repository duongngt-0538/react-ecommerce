import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpHelper } from '../../../helpers/httpHelper';

const BrandsFilter = () => {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const { get } = httpHelper();
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await get('http://localhost:5000/brands');
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const brandsFromURL = urlParams.getAll('brands');
    setSelectedBrands(brandsFromURL);
  }, [location.search]);

  const handleCheckboxClick = (brand) => {
    const updatedSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedSelectedBrands);
    updateURL(updatedSelectedBrands);
  };

  const updateURL = (updatedSelectedBrands) => {
    const urlParams = new URLSearchParams(location.search);

    urlParams.delete('brands');

    updatedSelectedBrands.forEach((brand) => {
      urlParams.append('brands', brand);
    });

    navigate({ search: urlParams.toString() });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Highlight the search text in brand names
  const highlightText = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="ais-Highlight-highlighted">{part}</mark> : part
    );
  };

  // Filter brands based on search query
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">Brands</div>
      <div className="ais-Panel-body">
        <div className="ais-RefinementList">
          <div className="ais-RefinementList-searchBox">
            <div className="ais-SearchBox">
              <form className="ais-SearchBox-form" noValidate role="search">
                <input
                  className="ais-SearchBox-input"
                  aria-label="Search"
                  placeholder="Search for brands…"
                  spellCheck="false"
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="ais-SearchBox-submit"
                  type="submit"
                  title="Submit the search query"
                >
                  <svg
                    className="ais-SearchBox-submitIcon"
                    width="10"
                    height="10"
                    viewBox="0 0 40 40"
                    aria-hidden="true"
                  >
                    <path d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"></path>
                  </svg>
                </button>
                <button
                  className="ais-SearchBox-reset"
                  type="reset"
                  title="Clear the search query"
                  hidden={!searchQuery}
                  onClick={() => setSearchQuery('')}
                >
                  <svg
                    className="ais-SearchBox-resetIcon"
                    viewBox="0 0 20 20"
                    width="10"
                    height="10"
                    aria-hidden="true"
                  >
                    <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <ul className="ais-RefinementList-list">
            {filteredBrands.map((brand) => (
              <li
                className={`ais-RefinementList-item ${selectedBrands.includes(brand.name) ? 'ais-RefinementList-item--selected' : ''}`}
                key={brand.name}
              >
                <label className="ais-RefinementList-label">
                  <input
                    className="ais-RefinementList-checkbox"
                    type="checkbox"
                    value={brand.name}
                    checked={selectedBrands.includes(brand.name)}
                    onChange={() => handleCheckboxClick(brand.name)}
                  />
                  <span className="ais-RefinementList-labelText">
                    <span className="ais-Highlight">
                      {highlightText(brand.name)}
                    </span>
                  </span>
                  <span className="ais-RefinementList-count">
                    {brand.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrandsFilter;
