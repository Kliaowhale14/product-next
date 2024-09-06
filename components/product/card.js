import { useState } from 'react';
import Link from 'next/link';

const Card = () => {
  const [card, setCard] = useState([]);

  return (
    <>
      <Link href={`/product`}>
        <div className="card" style={{ width: 200, display: 'inline-block' }}>
          <img src="img/img1.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text ">Title</p>
            <p className="card-text">Price</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
