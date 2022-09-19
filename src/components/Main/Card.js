import React, { useState } from 'react';

export default function Card({ item, isCatalog = true }) {
   const { title, price, images, id } = item;
   const [image, setImage] = useState(images[0]);

   const CardClass = isCatalog ? 'catalog-item-card card' : 'card';

   const showAdditionalImage = () => {
      if (images[1]) setImage(images[1]);
   };
   const showDefoultImage = () => {
      setImage(images[0]);
   };

   const formatPrice = (number) => {
      const string = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const formatedPrice = `${string} руб.`;
      return formatedPrice;
   };

   return (
      <div className="col-4">
         <div
            className={CardClass}
            onMouseLeave={showDefoultImage}
            onPointerEnter={showAdditionalImage}
         >
            <div className="card-img">
               <img
                  src={image}
                  className="card-img-top img-fluid"
                  alt={title}
                  onError={showDefoultImage}
               />
            </div>
            <div className="card-body">
               <p className="card-text">{title}</p>
               <p className="card-text">{formatPrice(price)}</p>
               <a href={`/catalog/${id}`} className="btn btn-outline-primary">
                  Заказать
               </a>
            </div>
         </div>
      </div>
   );
}
