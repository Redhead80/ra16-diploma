/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesThunked } from '../../actions/thunks'; 
import { changeCategory } from '../../actions/actionCreator';

export default function Categories() {
   const dispatch = useDispatch();
   const { categories, category } = useSelector((state) => state.catalog);

   useEffect(() => {
      dispatch(fetchCategoriesThunked());
   }, [dispatch]);

   const onChangeCategory = (id) => {
      dispatch(changeCategory(id));
   };

   const icatalogisLoad = useSelector((state) => state.catalog.catalogisLoad);
   const categoriesisLoad = useSelector(
      (state) => state.catalog.categoriesisLoad
   );

   if (icatalogisLoad || categoriesisLoad) return <div />;
   return (
      <ul className="catalog-categories nav justify-content-center">
         {categories &&
            categories.map((item) => (
               <li className="nav-item" key={item.id}>
                  <a
                     role="button"
                     tabIndex={item.id}
                     className={
                        category === item.id ? 'nav-link active' : 'nav-link'
                     }
                     onClick={() => {
                        onChangeCategory(item.id);
                     }}
                     onKeyDown={() => {
                        onChangeCategory(item.id);
                     }}
                  >
                     {item.title}
                  </a>
               </li>
            ))}
      </ul>
   );
}
