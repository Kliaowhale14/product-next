import { useState, useEffect } from 'react';
import Card from '@/components/product/card';
import Link from 'next/link';
//import BS5Pagination from '@/components/common/bs5-pagination';

// 後端的資料來源: http://localhost:3005/api/my-product-
export default function List() {
  // 注意1: 初始值至少要空白陣列。初次render是使用初始值，需要對應伺服器的資料模型
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(務必一定要是陣列)
  // 最後從伺服器得到的資料
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0); // 總筆數
  const [pageCount, setPageCount] = useState(0); // 總頁數

  // 分頁用
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(20);

  // 與伺服器作fetch獲得資料
  const getProducts = async (params = {}) => {
    const baseUrl = 'http://localhost:3005/api/product_list';
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseUrl}?${qs}`;

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount);
        setTotal(resData.data.total);
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.products)) {
          setProducts(resData.data.products);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 樣式3 didMount+didUpdate
  useEffect(() => {
    // 建立搜尋參數物件
    const params = {
      page,
      perpage,
    };
    // 向伺服器fetch
    getProducts(params);
  }, [page, perpage]);
  //  ^^^^^^^^^^^^^^ 這裡會監聽page,perpage狀態的更動，有更動會向伺服器作fetch
  return (
    <>
      <div>
        <Card />
      </div>
    </>
  );
}
