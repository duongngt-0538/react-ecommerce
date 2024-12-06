import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpHelper } from '../../../helpers/httpHelper';

const RatingsFilter = () => {
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const { get } = httpHelper();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await get('http://localhost:5000/ratings');
        setRatings(data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const ratingFromURL = urlParams.get('rating');
    setSelectedRating(ratingFromURL);
  }, [location.search]);

  const handleRatingClick = (rating) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    updateURL(newRating);
  };

  const updateURL = (rating) => {
    const searchParams = new URLSearchParams(location.search);
    if (rating) {
      searchParams.set('rating', rating);
    } else {
      searchParams.delete('rating');
    }
    navigate({ search: searchParams.toString() });
  };

  const renderStars = (rating) => {
    const fullStars = Array.from({ length: 5 }, (_, index) => index < rating);
    return fullStars.map((isFull, index) => (
      <svg
        key={index}
        className={`ais-RatingMenu-starIcon ${isFull ? 'ais-RatingMenu-starIcon--full' : 'ais-RatingMenu-starIcon--empty'}`}
        aria-hidden="true"
        viewBox="0 0 16 16"
      >
        <path fillRule="evenodd" d="M10.472 5.008L16 5.816l-4 3.896.944 5.504L8 12.616l-4.944 2.6L4 9.712 0 5.816l5.528-.808L8 0z"></path>
      </svg>
    ));
  };

  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">Ratings</div>
      <div className="ais-Panel-body">
        <div className="ais-RatingMenu">
          <ul className="ais-RatingMenu-list">
            {ratings.map((rating) => (
              <li
                key={rating.value}
                className={`ais-RatingMenu-item ${selectedRating === String(rating.value) ? 'ais-RatingMenu-item--selected' : ''}`}
              >
                <span
                  className="ais-RatingMenu-link"
                  aria-label={`${rating.value} & up`}
                  onClick={() => handleRatingClick(String(rating.value))}
                  href="#"
                >
                  {renderStars(rating.value)}
                  <span className="ais-RatingMenu-count">{rating.count}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RatingsFilter;
