import { useState } from 'react';
import Link from 'next/link';
import cate from '@/styles/categoraylist.module.css';

export default function Categoraylist() {
  const [categoraylist, setCategorayList] = useState([]);
  const type = ['咖啡豆', '季節限定', '推薦送禮'];

  return (
    <>
      <div>
        {type.map((v, i) => {
<<<<<<<<< Temporary merge branch 1
          return <button key={i}>{v}</button>;
        })}
      </div>
=========
          return (
            <Link href={`/product/type/${v}`} key={i}>
              {v}
            </Link>
          );
        })}
      </div>
      <Link href={`/product/list`}></Link>
>>>>>>>>> Temporary merge branch 2
    </>
  );
}
