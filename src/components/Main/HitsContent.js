import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHitsThunked } from '../../actions/thunks';
import Loader from './Loader';
import Card from './Card';

export default function HitsContent() {
   const dispatch = useDispatch();
   const storedItems = useSelector((state) => state.hits.items);
   const isLoad = useSelector((state) => state.hits.isLoaded);
   const isError = useSelector((state) => state.hits.isError);
   useEffect(() => {
      dispatch(fetchHitsThunked());
   }, [dispatch]);

   if (isLoad) return <Loader />;
   if (isError) return <div>Произошла ошибка! Попробуйте вернуться позже!</div>;

   return (
      <div className="row">
         {storedItems &&
            storedItems.map((item) => (
               <Card item={item} key={item.id} isCatalog={false} />
            ))}
      </div>
   );
}