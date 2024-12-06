import React from 'react';
import ItemCard from './ItemCard';

const ItemList = ({ items, searchQuery }) => {
  return (
    <div className="ais-Hits">
      <ol className="ais-Hits-list">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            image={item.image}
            category={item.hierarchicalCategories.lvl0}
            name={item.name}
            description={item.description}
            price={item.price}
            rating={item.rating}
            searchQuery={searchQuery}
          />
        ))}
      </ol>
    </div>
  );
};

export default ItemList;
