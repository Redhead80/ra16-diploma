import Categories from './Categories';
import Products from './Products';
import Search from './Search';

function Catalog(props) {
  const { withSearch } = props;
  
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withSearch && <Search />}
      <Categories/>
      <Products/>
    </section>
  );
}

export default Catalog;
