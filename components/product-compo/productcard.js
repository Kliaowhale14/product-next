import React from 'react';
// import LoadingImageSvg from './loading-image-svg'
import Image from 'next/image';
import Link from 'next/link';
import style from '@/styles/productlist.module.css';

export default function ProductCard({ item }) {
  return (
    <>
      <Link className={style.card} href={`/product/${item.p_id}`}>
        <div>
          <img
            className={style.cardimg}
            src={`/images/product/thumb/t1.jpg`}
            alt="..."
          />

          <div className={style.cardtitle}>
            <p>{item.p_name}</p>
            <p>NT.{item.p_price}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
