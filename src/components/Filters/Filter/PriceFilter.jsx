import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const PriceFilter = ({ min = 1, max = 5000, onChange }) => {
  const [values, setValues] = useState([min, max]);
  const sliderRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get('price');
    if (price) {
      const [minPrice, maxPrice] = price.split(':').map(Number);
      setValues([minPrice, maxPrice]);
    }
  }, [location.search]);

  const updateValues = (index, value) => {
    const newValues = [...values];
    newValues[index] = Math.min(Math.max(value, min), max);
    if (newValues[0] > newValues[1]) {
      newValues[index] = values[index];
    }
    setValues(newValues);
    if (onChange) onChange(newValues);
    debounceUpdateURL(newValues);
  };

  const updateURL = (newValues) => {
    const searchParams = new URLSearchParams(location.search);
    let priceParam = '';
    if (newValues[0] !== min) {
      priceParam += `${newValues[0]}`;
    }
    priceParam += ':';
    if (newValues[1] !== max) {
      priceParam += `${newValues[1]}`;
    }
    if (priceParam !== ':') {
      searchParams.set('price', priceParam);
    } else {
      searchParams.delete('price');
    }
    navigate({ search: searchParams.toString() });
  };

  const debounceUpdateURL = debounce(updateURL, 300);

  const handleMove = (event, index) => {
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const percentage = ((event.clientX - sliderRect.left) / sliderRect.width) * 100;
    const value = Math.round((percentage / 100) * (max - min) + min);
    updateValues(index, value);
  };

  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">Price</div>
      <div className="ais-Panel-body">
        <div className="ais-RangeSlider" style={{ position: 'relative', marginTop: '1.5rem' }} ref={sliderRef}>
          <div className="slider-rail"></div>

          <div
            className="slider-track"
            style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`,
              width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
            }}
          ></div>

          {values.map((value, index) => (
            <div key={index}>
              <div
                role="slider"
                className="slider-handle"
                style={{
                  left: `${((value - min) / (max - min)) * 100}%`,
                }}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                onMouseDown={(e) => {
                  const moveHandler = (event) => handleMove(event, index);
                  const upHandler = () => {
                    document.removeEventListener('mousemove', moveHandler);
                    document.removeEventListener('mouseup', upHandler);
                  };
                  document.addEventListener('mousemove', moveHandler);
                  document.addEventListener('mouseup', upHandler);
                }}
              ></div>

              <div
                className="slider-tick"
                style={{
                  left: `${((value - min) / (max - min)) * 100}%`,
                }}
              >
                <span style={{ color: '#e2a400', marginRight: 4 }}>$</span>
                {value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
