import {
  PUT_CATEGORIES,
  PUT_CATALOG_ITEMS,
  CHANGE_CATEGORY,
  PUT_PRODUCT,
  PUT_MORE_ITEMS,
  REPORT_COMPLETION_OF_ITEMS,
  CHANGE_SEARCH_FIELD,
  DECLARE_LOADING_CATALOG,
  DECLARE_LOADING_CATEGORIES,
  DECLARE_LOADING_MORE_PRODUCTS,
  DECLARE_LOADING_PRODUCT,
  CATALOG_ERROR,
} from '../actions/actionsType';

const initialstate = {
  categories: null,
  category: 0,
  items: [],
  noMoreItems: false,
  product: null,
  catalogisLoad: false,
  categoriesisLoad: false,
  searchValue: '',
  moreProductsisLoad: false,
  productIsLoad: false,
  isError: null,
};

export default function catalogReducer(state = initialstate, action) {
  switch (action.type) {
     case PUT_CATEGORIES:
        return {
           ...state,
           categories: [{ id: 0, title: 'Все' }, ...action.payload.items],
        };
     case PUT_CATALOG_ITEMS:
        return {
           ...state,
           items: action.payload.items,
        };
     case CHANGE_CATEGORY:
        return {
           ...state,
           category: action.payload.id,
        };
     case PUT_PRODUCT:
        return {
           ...state,
           product: action.payload.product,
        };
     case PUT_MORE_ITEMS:
        return {
           ...state,
           items: [...state.items, ...action.payload.items],
        };
     case REPORT_COMPLETION_OF_ITEMS:
        return {
           ...state,
           noMoreItems: action.payload,
        };
     case CHANGE_SEARCH_FIELD:
        return {
           ...state,
           searchValue: action.payload,
        };

     case DECLARE_LOADING_CATALOG:
        return {
           ...state,
           catalogisLoad: action.payload,
        };
     case DECLARE_LOADING_CATEGORIES:
        return {
           ...state,
           categoriesisLoad: action.payload,
        };
     case DECLARE_LOADING_MORE_PRODUCTS:
        return {
           ...state,
           moreProductsisLoad: action.payload,
        };
     case DECLARE_LOADING_PRODUCT:
        return {
           ...state,
           productIsLoad: action.payload,
        };
     case CATALOG_ERROR:
        return {
           ...state,
           productIsLoad: action.payload,
        };

     default:
        return state;
  }
}
