function Count({ count, setCount }) {
   const onLess = () => {
      setCount(count - 1 || 1);
   };

   const onMore = () => {
      setCount(count >= 10 ? 10 : count + 1);
   };

   return (
      <p>
         Количество:
         <span className="btn-group btn-group-sm pl-2">
            <button
               type="button"
               className="btn btn-secondary"
               onClick={onLess}
            >
               -
            </button>
            <span className="btn btn-outline-primary">{count}</span>
            <button
               type="button"
               className="btn btn-secondary"
               onClick={onMore}
            >
               +
            </button>
         </span>
      </p>
   );
}

export default Count;
