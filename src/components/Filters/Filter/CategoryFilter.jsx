import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpHelper } from '../../../helpers/httpHelper';

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const { get } = httpHelper();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get('http://localhost:5000/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const getPathSegments = () => {
    return location.pathname.split('/').slice(1);
  };

  const isActiveCategory = (categoryName) => {
    const pathSegments = getPathSegments();
    return pathSegments[0] === 'search' && decodeURIComponent(pathSegments[1]) === categoryName;
  };

  const isActiveSub = (categoryName, subName) => {
    const pathSegments = getPathSegments();
    return (
      pathSegments[0] === 'search' &&
      decodeURIComponent(pathSegments[1]) === categoryName &&
      decodeURIComponent(pathSegments[2]) === subName
    );
  };

  const toggleCategory = (category) => {
    const pathSegments = getPathSegments();
    const searchParams = new URLSearchParams(location.search);

    let newPathSegments = ['search'];

    if (!pathSegments.includes(category)) {
      newPathSegments.push(category);
    } else {
      newPathSegments = newPathSegments.filter((seg) => seg !== category);
    }

    const newPath = `/${newPathSegments.join('/')}`;
    const url = newPath + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    navigate(url);
  };

  const toggleSubcategory = (category, sub) => {
    const pathSegments = getPathSegments();
    const searchParams = new URLSearchParams(location.search);

    let newPathSegments = ['search'];

    newPathSegments.push(category);

    if (!pathSegments.includes(sub)) {
      newPathSegments.push(sub);
    } else {
      newPathSegments = newPathSegments.filter((seg) => seg !== sub);
    }

    const newPath = `/${newPathSegments.join('/')}`;
    const url = newPath + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    navigate(url);
  };

  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">Category</div>
      <div className="ais-Panel-body">
        <ul className="ais-HierarchicalMenu-list">
          {categories.map((category) => (
            <li
              key={category.name}
              className={`ais-HierarchicalMenu-item ${
                isActiveCategory(category.name)
                  ? 'ais-HierarchicalMenu-item--selected ais-HierarchicalMenu-item--parent'
                  : ''
              }`}
            >
              <span
                onClick={() => toggleCategory(category.name)}
                className="ais-HierarchicalMenu-link"
              >
                <span className="ais-HierarchicalMenu-label">{category.name}</span>
                <span className="ais-HierarchicalMenu-count">{category.count}</span>
              </span>
              {isActiveCategory(category.name) && category.subcategories && (
                <ul className="ais-HierarchicalMenu-list ais-HierarchicalMenu-list--child">
                  {category.subcategories.map((sub) => (
                    <li
                      key={sub.name}
                      className={`ais-HierarchicalMenu-item ${
                        isActiveSub(category.name, sub.name)
                          ? 'ais-HierarchicalMenu-item--selected'
                          : ''
                      }`}
                    >
                      <span
                        onClick={() => toggleSubcategory(category.name, sub.name)}
                        className="ais-HierarchicalMenu-link"
                      >
                        <span className="ais-HierarchicalMenu-name">{sub.name}</span>
                        <span className="ais-HierarchicalMenu-count">{sub.count}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilter;
