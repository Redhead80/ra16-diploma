import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from '../../actions/actionCreator';
import { fetchSearchItemsThunked } from '../../actions/thunks';

function Search() {
   const { searchValue } = useSelector((state) => state.catalog);
   const dispatch = useDispatch();

   const onChangeField = (e) => {
      const { value } = e.target;
      dispatch(changeSearchField(value));
   };

   return (
      <form
         className="catalog-search-form form-inline"
         onSubmit={(e) => {
               e.preventDefault();
               dispatch(fetchSearchItemsThunked());
            }
         }
      >
         <input
            className="form-control"
            placeholder="Поиск"
            name="search"
            value={searchValue}
            onChange={onChangeField}
         />
      </form>
   );
}

export default Search;
