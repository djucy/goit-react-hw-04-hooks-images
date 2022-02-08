import { BallTriangle } from 'react-loader-spinner';
import '/node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import PropTypes from 'prop-types';
import s from './Spinner.module.css';

const Spinner = ({ text }) => {
  return (
    <div className={s.Spinner__position}>
      <span className={s.Spinner__box}>
        <BallTriangle color="#168b64" height={110} width={110} />
      </span>
      <p className={s.Spinner__text}>{text}</p>
    </div>
  );
};

Spinner.propTypes = {
  text: PropTypes.string,
};
export default Spinner;

