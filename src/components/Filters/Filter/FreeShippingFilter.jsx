import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FreeShippingFilter = () => {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const freeShipping = searchParams.get('free_shipping') === 'true';
    setIsChecked(freeShipping);
  }, [location.search]);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    const searchParams = new URLSearchParams(location.search);

    if (checked) {
      searchParams.set("free_shipping", "true");
    } else {
      searchParams.delete("free_shipping");
    }

    navigate({ search: searchParams.toString() });
  };

  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">Free shipping</div>
      <div className="ais-Panel-body">
        <div className="ais-ToggleRefinement">
          <label className="ais-ToggleRefinement-label">
            <input
              className="ais-ToggleRefinement-checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="ais-ToggleRefinement-labelText">
              Display only items with free shipping
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FreeShippingFilter;
