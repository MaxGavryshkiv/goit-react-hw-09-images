import React from "react";
import PropTypes from "prop-types";

import "../styles/ImageGalleryItem.scss";

const ImageGalleryItem = ({ objs, onClickModal }) => (
  <>
    {objs.map(({ id, largeImageURL, webformatURL, tags }) => (
      <li
        className="ImageGalleryItem"
        key={id}
        onClick={() => onClickModal(largeImageURL)}
      >
        <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
      </li>
    ))}
  </>
);

ImageGalleryItem.propTypes = {
  onClickModal: PropTypes.func.isRequired,
  objs: PropTypes.array.isRequired,
};

export default ImageGalleryItem;
