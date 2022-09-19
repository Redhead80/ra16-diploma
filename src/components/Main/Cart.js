/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../actions/actionCreator';
import { fetchOrderFormThunked } from '../../actions/thunks';

export default function Cart() {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.cart.cart);
   const total = products.reduce(
      (sum, product) => sum + product.price * product.count,
      0
   );
   const INITIONAL_FORM_STATE = {
      phone: useSelector((state) => state.cart.owner.phone) || '',
      address: useSelector((state) => state.cart.owner.address) || '',
      agreement: false,
   };
   const [owner, setOwner] = useState(INITIONAL_FORM_STATE);
   const [message, setMessage] = useState('');
   const status = useSelector((state) => state.cart.status);
   const isLoading = useSelector((state) => state.cart.loading);

   const formatPrice = (number) => {
      const string = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      const formatedPrice = `${string} руб.`;
      return formatedPrice;
   };

   const validatePhone = (phone) => {
      const regex =
         /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
      return regex.test(phone);
   };

   const onDelete = (cartId) => {
      dispatch(removeFromCart(cartId));
   };

   const showMessage = (text) => {
      setMessage(text);
      setTimeout(() => {
         setMessage('');
      }, 6 * 1000);
   };

   useEffect(() => {
      if (isLoading) showMessage('Оформляем покупку, пожалуйста подождите');
      if (status === 'ok')
         showMessage('✔️ Заказ успешно оформлен, спасибо за покупку!');
      if (status === 'error')
         showMessage('⚠️ Что-то пошло не так, пожалуйста попробуйте позже!');
   }, [status, isLoading]);

   const onSubmit = (e) => {
      e.preventDefault();
      if (products.length === 0) {
         showMessage('⚠️ Корзина пуста');
         return;
      }
      if (!validatePhone(owner.phone)) {
         showMessage('⚠️ Неверно введен номер телефона');
         return;
      }
      if (!owner.address) {
         showMessage('⚠️ Введите адрес');
         return;
      }
      if (!owner.agreement) {
         showMessage('⚠️ Необходимо согласие с правилами доставки');
         return;
      }
      dispatch(fetchOrderFormThunked(owner));
   };

   const onFieldChange = (e) => {
      const { target } = e;
      setOwner((prev) => ({
         ...prev,
         [target.name]:
            target.type === 'checkbox' ? target.checked : target.value,
      }));
   };

   return (
      <div>
         <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Название</th>
                     <th scope="col">Размер</th>
                     <th scope="col">Кол-во</th>
                     <th scope="col">Стоимость</th>
                     <th scope="col">Итого</th>
                     <th scope="col">Действия</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((product, index) => (
                     <tr key={product.id}>
                        <td scope="row">{index + 1}</td>
                        <td>
                           <Link to={`/products/${product.id}`}>
                              {product.title}
                           </Link>
                        </td>
                        <td>{product.size}</td>
                        <td>{product.count}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{formatPrice(product.price * product.count)}</td>
                        <td>
                           <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => onDelete(product.cartId)}
                           >
                              Удалить
                           </button>
                        </td>
                     </tr>
                  ))}

                  <tr>
                     <td colSpan="5" className="text-right">
                        Общая стоимость
                     </td>
                     <td>{formatPrice(total)}</td>
                  </tr>
               </tbody>
            </table>
         </section>
         <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div
               className="card"
               style={{ maxWidth: '30rem', margin: '0 auto' }}
            >
               <form className="card-body" onSubmit={onSubmit}>
                  <div className="form-group">
                     <label htmlFor="phone">Телефон</label>
                     <input
                        className="form-control"
                        id="phone"
                        placeholder="Ваш телефон"
                        name="phone"
                        value={owner.phone}
                        onChange={onFieldChange}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="address">Адрес доставки</label>
                     <input
                        className="form-control"
                        id="address"
                        placeholder="Адрес доставки"
                        name="address"
                        value={owner.address}
                        onChange={onFieldChange}
                     />
                  </div>
                  <div className="form-group form-check">
                     <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        name="agreement"
                        checked={owner.agreement}
                        onChange={onFieldChange}
                     />
                     <label className="form-check-label" htmlFor="agreement">
                        Согласен с правилами доставки
                     </label>
                  </div>
                  <button type="submit" className="btn btn-outline-secondary">
                     Оформить
                  </button>
               </form>
            </div>
            <div className="cart-warning">{message}</div>
         </section>
      </div>
   );
}
