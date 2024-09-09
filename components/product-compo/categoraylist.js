import React from 'react';
import Link from 'next/link';

export default function Categoraylist() {
  return (
    <>
      <ul className="categoraylist">
        <li>
          <Link href="/" className="linkStyle">
            所有商品
          </Link>
        </li>
        <li>
          <Link href="/limit">季節限定</Link>
        </li>
        <li>
          <Link href="/gift">送禮推薦</Link>
        </li>
        <li>
          <Link href="/sale">特價專區</Link>
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
