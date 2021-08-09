import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "../styles/Button.scss";

export default function Button({ onClick }) {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <button type="button" onClick={onClick} className="Button">
      Load More
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
