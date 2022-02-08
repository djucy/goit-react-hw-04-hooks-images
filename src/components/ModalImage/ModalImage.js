import PropTypes from 'prop-types';

import s from './ModalImage.module.css';

export default function ModalImage({ url, id, alt, onCloseModal }) {
   
  //Картинка в модальном окне
  return (
      <img
        className={s.ModalImg}
        src={url}
        alt={alt}
        id={id}
        onClick={onCloseModal}
      />
    );
  
}

ModalImage.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};

