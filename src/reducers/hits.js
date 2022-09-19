import { 
   PUT_HITS, 
   HITS_LOAD, 
   HITS_ERROR } from '../actions/actionsType';

const initState = {
   items: null,
   isLoaded: false,
   isError: null,
};

export default function hitsReducer(state = initState, action) {
   switch (action.type) {
      case PUT_HITS:
         return {
            ...state,
            items: action.payload.items,
         };
      case HITS_LOAD:
         return {
            ...state,
            isLoaded: action.payload,
         };
      case HITS_ERROR:
         return {
            ...state,
            isError: action.payload,
         };

      default:
         return state;
   }
}
