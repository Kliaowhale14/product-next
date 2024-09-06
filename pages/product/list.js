import { useState } from 'react';
import Card from '../../components/product/card';

export default function List() {
  
  const [products, setProducts] = useState([]);
  // 與伺服器作fetch獲得資料
  const getProducts = async (params = {}) => {
    const baseUrl = 'http://localhost:3005/product_list';
    // 轉換params為查詢字串
    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseUrl}?${qs}`;

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url);
      const resData = await res.json();

      if (resData.status === 'success') {
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
  return (
    <>
      <Card />
    </>
  );
}
