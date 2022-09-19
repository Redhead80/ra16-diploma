import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cart';
import catalogReducer from '../reducers/catalog';
import hitsReducer from '../reducers/hits';

const store = configureStore({
   reducer: {
      hits: hitsReducer,
      catalog: catalogReducer,
      cart: cartReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default store;
