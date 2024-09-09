import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product-compo/productcard';
import Categoraylist from '@/components/product-compo/categoraylist';

// 有名稱的路由(巢狀路由)
export default function List() {
  // 商品物件陣列狀態
  // 注意1: 初始值至少要空陣列，初次渲染使用的是初始值
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(陣列)
  const [products, setProducts] = useState([]);

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)
  const getProducts = async () => {
    const baseURL = 'http://localhost:3005/api/product_list';

    try {
      const res = await fetch(baseURL);
      const resData = await res.json();

      console.log(resData);

      // 設定到狀態中
      // (3.) 設定到狀態後 -> 觸發update(re-render)
      if (resData.status === 'success') {
        setProducts(resData.data.products);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 樣式2: didMount
  useEffect(() => {
    // (2.) 初次render之後，執行這裡一次
    getProducts();
  }, []);

  return (
    <>
    <Categoraylist />
      <h1>商品列表頁</h1>
      <h2>使用動態路由:`[productId]`</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products &&
          products.map((item) => {
            return <ProductCard item={item} key={item.id} />
          })}
      </div>
    </>
  );
}
