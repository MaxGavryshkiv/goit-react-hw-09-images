import axios from "axios";
import PropTypes from "prop-types";

const fetchHits = ({ searchQuery = "", currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=21314712-d360d7109d82acff562e015b0&image_type=photo&orientation=horizontal&per_page=${pageSize}`
    )
    .then((response) => response.data.hits);
};

fetchHits.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default { fetchHits };
