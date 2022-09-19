import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeSearchField } from '../../actions/actionCreator';
import { fetchSearchItemsThunked } from '../../actions/thunks';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    search: '',
    visible: false,
 });
 const quantity = useSelector((state) => state.cart.cart).length;

  const onSearch = (e) => {
    e.preventDefault();
    if (form.search.trim()) {
        dispatch(changeSearchField(form.search));
        setForm((prev) => ({ ...prev, search: '' }));
        navigate('/catalog');
        dispatch(fetchSearchItemsThunked());
    }
    setForm((prev) => ({ ...prev, visible: !form.visible }));
  };

  const onChangeField = (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, search: value }));
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/"> </a>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Главная</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/catalog">Каталог</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">О магазине</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contacts">Контакты</a>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={onSearch} onKeyPress={onSearch}></div>
                  <Link to="/cart" className="header-controls-pic header-controls-cart">
                    {Boolean(quantity) && (
                        <div className="header-controls-cart-full">
                          {quantity}
                        </div>
                    )}
                    <div className="header-controls-cart-menu"></div>
                  </Link>
                </div>
                <form
                  data-id="search-form"
                  className={
                    form.visible === true
                        ? 'header-controls-search-form form-inline'
                        : 'header-controls-search-form form-inline invisible'
                  }
                  onSubmit={onSearch}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    name="search"
                    onChange={onChangeField}
                    value={form.search}
                  />
              </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
