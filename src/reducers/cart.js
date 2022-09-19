import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_OWNER,
  CLEAR_CART,
  SET_STATUS,
  DECLARE_LOADING_ORDER,
} from '../actions/actionsType';

const owner = JSON.parse(localStorage.getItem('owner'));

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  owner: {
     phone: owner ? owner.phone : '',
     address: owner ? owner.address : '',
     agreement: false,
  },
  status: null,
  loading: false,
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
     case ADD_TO_CART:
        const product = action.payload;
        if (state.cart.find((item) => item.cartId === product.cartId)) {
           const cart = state.cart.map((item) => {
              if (item.cartId === product.cartId) item.count += product.count;
              return item;
           });
           localStorage.setItem('cart', JSON.stringify(cart));
           return { ...state, cart };
        }
        localStorage.setItem('cart', JSON.stringify([...state.cart, product]));
        return {
           ...state,
           cart: [...state.cart, action.payload],
        };

     case REMOVE_FROM_CART:
        const cart = state.cart.filter(
           (item) => item.cartId !== action.payload
        );
        localStorage.setItem('cart', JSON.stringify(cart));
        return {
           ...state,
           cart,
        };
     case SET_CART_OWNER:
        localStorage.setItem('owner', JSON.stringify(action.payload));
        return {
           ...state,
           owner: action.payload,
        };
     case CLEAR_CART:
        localStorage.removeItem('cart');
        return {
           ...state,
           cart: [],
        };
     case SET_STATUS:
        return {
           ...state,
           status: action.payload,
        };
     case DECLARE_LOADING_ORDER:
        return {
           ...state,
           loading: action.payload,
        };
     default:
        return state;
  }
}
