import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ onClick, id, largeImageURL, tags, webformatURL }) {
  

   const onOpenImage = () => {
    onClick(id,largeImageURL,tags,);
  };
  
   
    return (
      <li key={id} className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItem__image}
          src={webformatURL}
          id={id}
          alt={tags}
          loading="lazy"
          onClick={onOpenImage}
        />
      </li>
    );
  
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func,
  largeImageURL:PropTypes.string.isRequired,
};

