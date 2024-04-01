import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from "react-feather"
import PropTypes from "prop-types";

const Carousel = ({ items }) => {
  return (
    <div className="carousel">
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
};

Carousel.defaultProps = {
  items: [],
};

export default Carousel;