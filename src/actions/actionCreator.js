import {
  PUT_HITS,
  PUT_CATEGORIES,
  PUT_CATALOG_ITEMS,
  CHANGE_CATEGORY,
  PUT_PRODUCT,
  PUT_MORE_ITEMS,
  REPORT_COMPLETION_OF_ITEMS,
  CHANGE_SEARCH_FIELD,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_OWNER,
  CLEAR_CART,
  SET_STATUS,
  HITS_LOAD,
  DECLARE_LOADING_CATALOG,
  DECLARE_LOADING_CATEGORIES,
  DECLARE_LOADING_MORE_PRODUCTS,
  DECLARE_LOADING_PRODUCT,
  DECLARE_LOADING_ORDER,
  HITS_ERROR,
  CATALOG_ERROR,
} from './actionsType';

export function hitsLoading(bool) {
   return {
      type: HITS_LOAD,
      payload: bool,
   };
 }

 export function hitsError(string) {
   return {
      type: HITS_ERROR,
      payload: string,
   };
 }

export function putHits(items) {
  return {
     type: PUT_HITS,
     payload: {
        items,
     },
  };
}

export function putCategories(items) {
  return {
     type: PUT_CATEGORIES,
     payload: {
        items,
     },
  };
}

export function putCatalogItems(items) {
  return {
     type: PUT_CATALOG_ITEMS,
     payload: {
        items,
     },
  };
}

export function putMoreItems(items) {
  return {
     type: PUT_MORE_ITEMS,
     payload: {
        items,
     },
  };
}

export function changeCategory(id) {
  return {
     type: CHANGE_CATEGORY,
     payload: {
        id,
     },
  };
}

export function putProduct(product) {
  return {
     type: PUT_PRODUCT,
     payload: {
        product,
     },
  };
}

export function reportCompletionOfItems(bul) {
  return {
     type: REPORT_COMPLETION_OF_ITEMS,
     payload: bul,
  };
}

export function declareLoadingCatalog(bul) {
  return {
     type: DECLARE_LOADING_CATALOG,
     payload: bul,
  };
}

export function declareLoadingCategories(bul) {
  return {
     type: DECLARE_LOADING_CATEGORIES,
     payload: bul,
  };
}

export function declareLoadingMoreProducts(bul) {
  return {
     type: DECLARE_LOADING_MORE_PRODUCTS,
     payload: bul,
  };
}

export function declareLoadingProduct(bul) {
  return {
     type: DECLARE_LOADING_PRODUCT,
     payload: bul,
  };
}

export function catalogError(string) {
  return {
     type: CATALOG_ERROR,
     payload: string,
  };
}

export function changeSearchField(value) {
  return {
     type: CHANGE_SEARCH_FIELD,
     payload: value,
  };
}

export function addToCart(product) {
  return {
     type: ADD_TO_CART,
     payload: product,
  };
}

export function removeFromCart(cartId) {
  return {
     type: REMOVE_FROM_CART,
     payload: cartId,
  };
}

export function setCartOwner(owner) {
  return {
     type: SET_CART_OWNER,
     payload: owner,
  };
}

export function clearCart() {
  return {
     type: CLEAR_CART,
  };
}

export function declareLoadingOrder(bul) {
  return {
     type: DECLARE_LOADING_ORDER,
     payload: bul,
  };
}

export function setStatusOrder(status) {
  return {
     type: SET_STATUS,
     payload: status,
  };
}
