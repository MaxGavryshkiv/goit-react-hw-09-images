import React, { useState } from "react";
import PropTypes from "prop-types";

import "../styles/Searchbar.scss";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => setQuery(e.currentTarget.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
