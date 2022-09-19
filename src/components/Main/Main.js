import Banner from './Banner';

function Main(props) {
  const { children } = props;
  return (
    <main className="container">
         <div className="row">
            <div className="col">
               <Banner />
               {children}
            </div>
         </div>
      </main>
  );
}

export default Main;