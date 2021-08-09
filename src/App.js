import React, { useState, useEffect, useCallback } from "react";

import Modal from "./Modal";
import Load from "./Loader";
import pixabayApi from "./servises/pixabay-api";
import ImageGallery from "./ImageGallery";
import Searchbar from "./Searchbar";
import Button from "./Button";

import "./App.scss";

// TODO propTypes and defaultProps

export default function App({ modalChild }) {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  const fetchHits = useCallback(() => {
    const option = { currentPage, searchQuery };
    setIsLoading(true);
    pixabayApi
      .fetchHits(option)
      .then((hits) => {
        setHits((prevHits) => [...prevHits, ...hits]);
      })
      .catch((error) => setError(error.messages))
      .finally(() => setIsLoading(false));
  }, [currentPage, searchQuery]);

  const updatePage = () => {
    setCurrentPage((precCurrentPage) => precCurrentPage + 1);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchHits();
  }, [fetchHits, searchQuery]);

  const onChangeQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
    setLargeImageURL("");
  };

  const openModal = (largeImg) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImg);
  };

  const closeModal = () => {
    setShowModal(!showModal);
  };

  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;
  return (
    <>
      {error && <h2>OOPS Error</h2>}

      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery
        obj={hits}
        onClickModal={openModal}
        modalChild={modalChild}
      />

      <div className="button-container">
        {isLoading && <Load />}

        {shouldRenderLoadMoreButton && <Button onClick={updatePage} />}
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
}

// class App extends React.Component {
//   state = {
//     hits: [],
//     currentPage: 1,
//     searchQuery: "",
//     isLoading: false,
//     error: null,
//     showModal: false,
//   };

// componentDidUpdate(prevProps, prevState) {
//   const { searchQuery } = this.state;
//   if (prevState.searchQuery !== searchQuery) {
//     this.fetchHits();
//   }
// }

// fetchHits = () => {
//   const { currentPage, searchQuery } = this.state;
//   const option = { currentPage, searchQuery };

//   this.setState({ isLoading: true });

//   pixabayApi
//     .fetchHits(option)
//     .then((hits) => {
//       this.setState((prevState) => ({
//         hits: [...prevState.hits, ...hits],
//         currentPage: prevState.currentPage + 1,
//       }));
//     })
//     .catch((error) => console.log(error))
//     .finally(() => this.setState({ isLoading: false }));
// };

// onChangeQuery = (query) => {
//   this.setState({
//     searchQuery: query,
//     currentPage: 1,
//     hits: [],
//     largeImageURL: "",
//   });
// };

// openModal = (largeImg) => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
//   this.setState(() => ({
//     largeImageURL: largeImg,
//   }));
// };

// closeModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };

//   render() {
//     const { hits, isLoading, showModal, largeImageURL } = this.state;
// const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

//     return (
// <>
//   <Searchbar onSubmit={this.onChangeQuery} />
//   <ImageGallery
//     obj={hits}
//     onClickModal={this.openModal}
//     modalChild={this.modalChild}
//   />

//   <div className="button-container">
//     {isLoading && <Load />}

//     {shouldRenderLoadMoreButton && <Button onClick={this.fetchHits} />}
//   </div>

//   {showModal && (
//     <Modal onClose={this.closeModal}>
//       <img src={largeImageURL} alt="" />
//     </Modal>
//   )}
// </>
//     );
//   }
// }

// export default App;
