import {
  putHits,
  hitsLoading,
  putCategories,
  putCatalogItems,
  putProduct,
  putMoreItems,
  reportCompletionOfItems,
  declareLoadingCatalog,
  declareLoadingMoreProducts,
  declareLoadingProduct,
  setCartOwner,
  setStatusOrder,
  declareLoadingOrder,
  clearCart,
  hitsError,
  catalogError,
} from './actionCreator';

export const fetchHitsThunked = () => (dispatch) => {
   dispatch(hitsLoading(true));
   fetch(`${process.env.REACT_APP_BACKEND_URL}top-sales/`)
      .then((responce) => responce.json())
      .then((json) => {
         dispatch(putHits(json));
         dispatch(hitsLoading(false));
      })
      .catch((err) => {
         dispatch(hitsLoading(false));
         dispatch(hitsError(err));
         console.log(err);
      });
};

export const fetchCategoriesThunked = () => (dispatch) => {
  fetch(`${process.env.REACT_APP_BACKEND_URL}categories/`)
     .then((responce) => responce.json())
     .then((json) => dispatch(putCategories(json)))
     .catch((err) => {
        dispatch(catalogError(err));
        console.log(err);
     });
};

export const fetchCatalogItemsThunked = () => (dispatch, getState) => {
  const { category, searchValue } = getState().catalog;

  const categoryId = category ? `categoryId=${category}&` : '';
  const q = searchValue ? `q=${searchValue}&` : '';
  const details = categoryId + q;

  const url = `${process.env.REACT_APP_BACKEND_URL}items?${details}`;
  dispatch(declareLoadingCatalog(true));
  fetch(url)
     .then((responce) => responce.json())
     .then((json) => {
        if (json.length < 6) dispatch(reportCompletionOfItems(true));
        else dispatch(reportCompletionOfItems(false));
        dispatch(putCatalogItems(json));
        dispatch(declareLoadingCatalog(false));
     })
     .catch((err) => {
        dispatch(declareLoadingCatalog(false));
        dispatch(catalogError(err));
        console.log(err);
     });
};

export const fetchProduct = (id) => (dispatch) => {
  dispatch(declareLoadingProduct(true));
  fetch(`${process.env.REACT_APP_BACKEND_URL}items/${id}`)
     .then((responce) => responce.json())
     .then((json) => {
        dispatch(putProduct(json));
        dispatch(declareLoadingProduct(false));
     })
     .catch((err) => {
        dispatch(catalogError(err));
        console.log(err);
     });
};

export const fetchMoreItemsThunked = () => (dispatch, getState) => {
  const offset = getState().catalog.items.length;
  const { category, searchValue } = getState().catalog;
  const categoryId = category ? `categoryId=${category}&` : '';
  const q = searchValue ? `q=${searchValue}&` : '';
  const details = categoryId + q;
  const url = `${process.env.REACT_APP_BACKEND_URL}items?${details}offset=${offset}`;
  dispatch(declareLoadingMoreProducts(true));
  fetch(url)
     .then((responce) => responce.json())
     .then((json) => {
        dispatch(putMoreItems(json));
        dispatch(declareLoadingMoreProducts(false));
        if (json.length < 6) dispatch(reportCompletionOfItems(true));
     })
     .catch((err) => {
        dispatch(declareLoadingCatalog(false));
        dispatch(putCatalogItems({}));
        dispatch(catalogError(err));
        console.log(err);
     });
};

export const fetchSearchItemsThunked = () => (dispatch, getState) => {
  const { category, searchValue, catalogisLoad } = getState().catalog;
  const controller = new AbortController();
  if (catalogisLoad) {
     controller.abort();
     dispatch(declareLoadingCatalog(false));
  }
  if (!searchValue) {
     dispatch(fetchCatalogItemsThunked());
     return;
  }
  dispatch(declareLoadingCatalog(true));
  fetch(
     `${process.env.REACT_APP_BACKEND_URL}items?categoryId=${category}&q=${searchValue}`,
     {
        signal: controller.signal,
     }
  )
     .then((responce) => responce.json())
     .then((json) => {
        dispatch(putCatalogItems(json));
        if (json.length < 6) dispatch(reportCompletionOfItems(true));
        dispatch(declareLoadingCatalog(false));
     })
     .catch((err) => {
        dispatch(declareLoadingCatalog(false));
        dispatch(putCatalogItems({}));
        dispatch(catalogError(err));
        console.log(err);
     });
};

export const fetchOrderFormThunked = (data) => (dispatch, getState) => {
  const products = getState().cart.cart;

  const owner = {
     phone: data.phone,
     address: data.address,
  };
  dispatch(setCartOwner(owner));

  const order = {
     owner,
     items: products.map((product) => ({
        id: Number(product.id),
        price: Number(product.price),
        count: Number(product.count),
     })),
  };
  dispatch(declareLoadingOrder(true));
  dispatch(setStatusOrder(null));

  fetch(`${process.env.REACT_APP_BACKEND_URL}order`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(order),
  })
     .then((response) => {
        if (!response.ok) {
           dispatch(setStatusOrder('error'));
           throw new Error(response.statusText);
        } else {
           dispatch(setStatusOrder('ok'));
           dispatch(clearCart());
           dispatch(declareLoadingOrder(false));
        }
     })
     .catch((err) => {
        dispatch(setStatusOrder('error'));
        dispatch(declareLoadingOrder(false));
        console.log(err);
     });
};
