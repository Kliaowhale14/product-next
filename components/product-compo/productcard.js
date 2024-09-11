import React from 'react';
// import LoadingImageSvg from './loading-image-svg'
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ item }) {
  return (
    <>
      <Link href={`/product/${item.p_id}`} className="col">
        <div className="card h-100" aria-hidden="true">
          <Image
            className="card-img-top"
            src={`/images/product/thumb/t1.jpg`}
            alt="..."
            width={300}
            height={200}
            placeholder="blur"
            blurDataURL={`/images/product/thumb/t1.jpg`}
            style={{ width: '100%', height: 'auto' }} // optional
          />

          <div className="card-body">
            <h5 className="card-title placeholder-glow  limit-text-lines1">
              {item.p_name}
            </h5>
            {/* <p className="card-text  max-lines">{item.info}</p> */}
            <p className="card-text  max-lines">NT.{item.p_price}</p>
          </div>
        </div>

        <style jsx>{`
          .limit-text-lines1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1; /* 限制要呈現的字行數 */
            line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .limit-text-lines2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 限制要呈現的字行數 */
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .limit-text-line3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3; /* 限制要呈現的字行數 */
            line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .max-lines {
            display: block; /* or inline-block */
            text-overflow: ellipsis;
            word-wrap: break-word;
            overflow: hidden;
            max-height: 3.6em; /* 限制要呈現的字行數=2 */
            line-height: 1.8em;
          }
        `}</style>
      </Link>
    </>
  );
}
