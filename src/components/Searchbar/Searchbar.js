import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit}){
  
  const [searchName, setSearchName] = useState('');
  
  
  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      return toast.warn('Введите название фото или картинки!', {
        theme: 'colored',
      });
    }
    onSubmit(searchName);
    setSearchName('');
  };

  const handleSearchNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={handleSearchNameChange}
          />
        </form>
      </header>
    );
  
}


