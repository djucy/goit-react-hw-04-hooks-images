import React from 'react';
import PropTypes from 'prop-types';


import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Text from '../Text/Text';
import Section from '../Section/Section.js';
import Spinner from '../Spinner/Spinner';

import s from './ImageGallery.module.css';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery ({images, status, error,onClick}) {
  
  //Пропсы для открытия картинки в модальном окне
  const onOpenImage = (id, largeImageURL, tags) => {
    onClick(id, largeImageURL, tags);
  };

    //Ожидание ввода названия фото
  if (status === Status.IDLE) {
      return <Text text={'Please, enter pictures name...'} />;
    }

  //Спиннер при загрузке фотографий
    if (status === Status.PENDING) {
      return (
        <Section>
          <Spinner
            text={'Please,wait. We are searching the pictures for you'}
          ></Spinner>
        </Section>
      );
    }


    //Вывод ошибки
    if (status === Status.REJECTED) {
      return (
        <Section>
          {error && <Text text={'We have a problem...pelase,try again...'} />}
        </Section>
      );
    }

  // Если было введено неверное название или, если нет фотографий с данным названием
    if (status === Status.RESOLVED && images.length === 0) {
      return <Text text={`Photo not found, please try another name`} />;
    }

    //Загрузка фотографий прошла успешно
  if (status === Status.RESOLVED && images.length !== 0) {
      return (
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              id={id}
              tags={tags}
              onClick={onOpenImage}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
      );
    }
  }


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  // onOpenImage:PropTypes.func.isRequired,
};




