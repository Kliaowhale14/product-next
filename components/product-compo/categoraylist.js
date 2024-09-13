import { useState } from 'react';
import Link from 'next/link';
import cate from '@/styles/categoraylist.module.css';

export default function Categoraylist() {
  const [categoraylist, setCategorayList] = useState('');
  const type = ['所有商品', '季節限定', '推薦送禮', '特價專區'];

  return (
    <>
      <div>
        {type.map((v, i) => {
          return <button key={i}>{v}</button>;
        })}
      </div>
    </>
  );
}
