import s from './Button.module.css';
import PropTypes from 'prop-types';

// КНОПКА ДЛЯ ДОЗАГРУЗКИ КАРТИНОК

export default function Button({ onLoadImages }) {
  return (
    <button type="submit" onClick={onLoadImages} className={s.Button}>
      Download more
    </button>
  );
}

Button.propTypes = {
  onLoadImages: PropTypes.func.isRequired,
};
