import React from 'react';
import Link from 'next/link';

export default function Categoraylist() {
  return (
    <>
      <ul className="categoraylist">
        <li>
          <Link href="/" style={{ color: '#f4772f', textDecoration: 'none' }}>
            所有商品
          </Link>
        </li>
        <li>
          <Link
            href="/limit"
            style={{ color: '#f4772f', textDecoration: 'none' }}
          >
            季節限定
          </Link>
        </li>
        <li>
          <Link
            href="/gift"
            style={{ color: '#f4772f', textDecoration: 'none' }}
          >
            送禮推薦
          </Link>
        </li>
        <li>
          <Link
            href="/sale"
            style={{ color: '#f4772f', textDecoration: 'none' }}
          >
            特價專區
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .categoraylist {
          list-style-type: none;
          display: flex;
          flex-direction: column;
        }
        .categoraylist li {
          padding: 20px;
        }

        .linkStyle {
          color: #f4772f;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
