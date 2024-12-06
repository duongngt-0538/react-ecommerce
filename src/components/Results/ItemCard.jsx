import React from 'react';
import { ReactComponent as Star } from '../../assets/star.svg';

const ItemCard = ({
  image,
  altText,
  category,
  name,
  description,
  price,
  rating,
  searchQuery
}) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const highlightText = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="ais-Highlight-highlighted">{part}</mark> : part
    );
  };

  return (
    <li className="ais-Hits-item">
      <article className="hit">
        <header className="hit-image-container">
          <img src={image} alt={altText} className="hit-image" />
        </header>
        <div className="hit-info-container">
          <p className="hit-category">{category}</p>
          <h1>
            <span className="ais-Highlight">
              {highlightText(name)}
            </span>
          </h1>
          <p className="hit-description">
            <span className="ais-Snippet">
              {highlightText(truncateText(description, 100))}
            </span>
          </p>
          <footer>
            <p>
              <span className="hit-em">$</span>
              <strong>{price}</strong>
              <span className="hit-em hit-rating">
                <Star />
                {rating}
              </span>
            </p>
          </footer>
        </div>
      </article>
    </li>
  );
};

export default ItemCard;
