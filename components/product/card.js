import React, { useState } from 'react';

export default function Card() {
  // const [productCard, setProductcard] = useState({

  // })
  return (
    <>
      <div className="card">
        <img
          src="img/img1.jpg"
          className=""
          alt=""
          width={230}
          height={200}
        ></img>
        <div className="">
          <h5>card title</h5>
          <p>card text</p>
        </div>
      </div>
    </>
  );
}
