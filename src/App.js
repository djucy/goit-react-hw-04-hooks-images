import React, { useState, useEffect } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ModalImage from './components/ModalImage/ModalImage';
import searchNameApi from './services/searchName-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Section from './components/Section/Section';

import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {

  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);



  // Поиск картинки по названию
  const handleSearchFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setImages([]);
    setStatus(Status.PENDING);
    // scroll.scrollToTop();
  };

  //Загрузка новых фотографий

  useEffect(() => {
    if (searchName === '') {
      return
    }
    getImages();
  }, [searchName, page]);

  //Дозагрузка фото
  const onLoadImages = () => {
    setPage(state => state + 1)
    // scroll.scrollToBottom('myScrollToElement', {
    //   duration: 2000,
    //   delay: 100,
    //   smooth: 'easeInCubic',
    //   // offset: -50,
    //   isDynamic: true
    // });
    scrollPage();
  };

  // Функция загрузки фотографий
  const getImages = () => {
    searchNameApi
      .fetchSearchName(searchName, page)
      .then(newArrayImages => {

        setImages(state => [...state, ...newArrayImages]);
        setStatus(Status.RESOLVED);
      })

      .catch(error => {
        setError(error.message);
        setStatus(Status.REJECTED)
      });
  }




  //Загрузка картинки при открытии модалки
  const onOpenImage = (id, largeImageURL, tags) => {
    setId(id);
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  //Открытие модалки
  const toggleModal = () => {
    setShowModal(state => !state);
  };

  // Закрытие модалки
  const onCloseModal = e => {
    if (e.currentTurget === e.turget) {
      toggleModal();
    }
  };

  //Скрол страницы
  const scrollPage = () => scroll.scrollToBottom('myScrollToElement', {
    duration: 2000,
    delay: 100,
    smooth: 'easeInCubic',
    // offset: -50,
    isDynamic: true
  });

  return (
    <Section>
      <Searchbar onSubmit={handleSearchFormSubmit}></Searchbar>
      <ToastContainer transition={Flip} />

      <ImageGallery
        images={images}
        onClick={onOpenImage}
        status={status}
      />
      {images.length >= 12 && images.length !== 0 && (
        <Button onLoadImages={onLoadImages} />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          {
            <ModalImage
              url={largeImageURL}
              id={id}
              alt={tags}
              onClick={onCloseModal}
            ></ModalImage>
          }
        </Modal>
      )}
    </Section>
  );
}

