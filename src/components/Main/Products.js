import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
   fetchCatalogItemsThunked,
   fetchMoreItemsThunked,
} from '../../actions/thunks';
import Loader from './Loader';
import Card from './Card';

export default function Products() {
   const dispatch = useDispatch();
   const { category, noMoreItems, moreProductsisLoad } = useSelector(
      (state) => state.catalog
   );
   const storedItems = useSelector((state) => state.catalog.items);
   const isError = useSelector((state) => state.catalog.isError);
   useEffect(() => {
      dispatch(fetchCatalogItemsThunked());
   }, [dispatch, category]);

   const onLoadMore = () => {
      dispatch(fetchMoreItemsThunked());
   };
   const icatalogisLoad = useSelector((state) => state.catalog.catalogisLoad);
   const categoriesisLoad = useSelector(
      (state) => state.catalog.categoriesisLoad
   );
   if (icatalogisLoad || categoriesisLoad) return <Loader />;

   if (storedItems.length)
      return (
         <div className="products">
            <div className="row">
               {storedItems.map((item) => (
                  <Card item={item} key={item.id} />
               ))}
            </div>
            <div className="text-center">
               {!noMoreItems &&
                  (!moreProductsisLoad ? (
                     <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={onLoadMore}
                     >
                        Загрузить ещё
                     </button>
                  ) : (
                     <Loader />
                  ))}
            </div>
         </div>
      );

   return (
      <div className="products">
         <div className="row">
            {isError ? (
               <div>Произошла ошибка! Попробуйте вернуться позже!</div>
            ) : (
               <div>По Вашему запросу ничего не найдено!</div>
            )}
         </div>
      </div>
   );
}
