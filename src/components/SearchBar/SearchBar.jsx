import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/algolia-logo.svg";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const searchParams = new URLSearchParams(window.location.search);
    if (newQuery) {
      searchParams.set("query", newQuery);
    } else {
      searchParams.delete("query");
    }
    navigate({ search: searchParams.toString() });
  };

  const handleClearSearch = () => {
    setQuery("");
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("query");
    navigate({ search: searchParams.toString() });
  };

  return (
    <header className="header">
      <p className="header-logo">
        <a href="https://algolia.com" aria-label="Go to the Algolia website">
          <Logo />
        </a>
      </p>
      <p className="header-title">Stop looking for an item — find it.</p>
      <div className="ais-SearchBox">
        <form className="ais-SearchBox-form" role="search" noValidate>
          <input
            className="ais-SearchBox-input"
            type="search"
            placeholder="Product, brand, color, …"
            aria-label="Search"
            maxLength="512"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            value={query}
            onInput={handleInputChange}
          />
          <button
            className="ais-SearchBox-submit"
            type="submit"
            title="Submit the search query"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
              aria-hidden="true"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
                transform="translate(1 1)"
              >
                <circle cx="7.11" cy="7.11" r="7.11"></circle>
                <path d="M16 16l-3.87-3.87"></path>
              </g>
            </svg>
          </button>
          <button
            className="ais-SearchBox-reset"
            type="reset"
            title="Clear the search query"
            hidden={!query}
            onClick={handleClearSearch}
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
          <span className="ais-SearchBox-loadingIndicator" hidden>
            <svg
              aria-label="Results are loading"
              width="16"
              height="16"
              viewBox="0 0 38 38"
              stroke="#444"
              className="ais-SearchBox-loadingIcon"
              aria-hidden="true"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18"></circle>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </g>
              </g>
            </svg>
          </span>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
