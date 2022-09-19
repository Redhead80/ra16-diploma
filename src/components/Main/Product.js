import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../actions/thunks';
import NotFound from './NotFound';
import Sizes from './Sizes';
import Count from './Count';
import { addToCart } from '../../actions/actionCreator';
import Loader from './Loader';

function Product() {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const product = useSelector((state) => state.catalog.product);
   const isLoading = useSelector((state) => state.catalog.productIsLoad);
   const [currentSize, setSize] = useState();
   const [inStock, setStock] = useState(-1);
   const [count, setCount] = useState(1);

   useEffect(() => {
      dispatch(fetchProduct(id));
   }, [dispatch, id]);

   useEffect(() => {
      if (product) setStock(product.sizes.filter((s) => s.avalible));
   }, [product]);

   const onChangeSize = (size) => {
      if (size === currentSize) setSize();
      else setSize(size);
   };

   const onAddToCart = () => {
      const addedProduct = {
         cartId: `${product.id}${currentSize}`,
         id,
         title: product.title,
         size: currentSize,
         count,
         price: product.price,
      };
      dispatch(addToCart(addedProduct));
      navigate('/cart');
   };

   if (isLoading) return <Loader />;
   if (!product) return <NotFound />;
   return (
      <section className="catalog-item">
         <h2 className="text-center">{product.title}</h2>
         <div className="row">
            <div className="col-5">
               <img src={product.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
               <table className="table table-bordered">
                  <tbody>
                     <tr>
                        <td>Артикул</td>
                        <td>{product.sku}</td>
                     </tr>
                     <tr>
                        <td>Производитель</td>
                        <td>{product.manufacturer}</td>
                     </tr>
                     <tr>
                        <td>Цвет</td>
                        <td>{product.color}</td>
                     </tr>
                     <tr>
                        <td>Материалы</td>
                        <td>{product.material}</td>
                     </tr>
                     <tr>
                        <td>Сезон</td>
                        <td>{product.season}</td>
                     </tr>
                     <tr>
                        <td>Повод</td>
                        <td>{product.reason}</td>
                     </tr>
                  </tbody>
               </table>
               {inStock.length ? (
                  <div className="text-center">
                     <div>
                        <Sizes
                           inStock={inStock}
                           currentSize={currentSize}
                           onChangeSize={onChangeSize}
                        />
                        <Count count={count} setCount={setCount} />
                     </div>
                     <button
                        disabled={!currentSize}
                        type="button"
                        className="btn btn-danger btn-block btn-lg"
                        onClick={onAddToCart}
                     >
                        В корзину
                     </button>
                  </div>
               ) : (
                  <p className="text-center">Нет в наличии</p>
               )}
            </div>
         </div>
      </section>
   );
}

export default Product;
