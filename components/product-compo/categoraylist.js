import { useState } from 'react';
import Link from 'next/link';
import cate from '@/styles/categoraylist.module.css';

export default function Categoraylist() {
  const [categoraylist, setCategorayList] = useState('shop');
  return (
    <>
      <ul className={cate.categoraylist}>
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
    </>
  );
}
