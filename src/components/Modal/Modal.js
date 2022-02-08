import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onClose,children}){
  
  //Закрытие модального окна при клике на клавишу Esc;
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, ['keydown']);
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  
  //Закрытие модального окни при клике на бэкдроп;
  const handleBackdropClick = e => {
    if (e.currentTurget === e.turget) {
      onClose();
    }
  };
 
    return createPortal(
      <div className={s.Overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
  
}



// const modalRoot = document.querySelector('#modal-root');
// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   handleBackdropClick = e => {
//     if (e.currentTurget === e.turget) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleBackdropClick}>
//         <div className={s.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

