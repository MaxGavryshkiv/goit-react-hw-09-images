import React from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import "../styles/ImageGallery.scss";
import PropTypes from "prop-types";

const ImageGallery = ({ obj, onClickModal }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem objs={obj} onClickModal={onClickModal} />
    </ul>
  );
};

ImageGallery.propTypes = {
  obj: PropTypes.array.isRequired,
  onClickModal: PropTypes.func.isRequired,
};

export default ImageGallery;
