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
  const [total, setTotal] = useState(0); //總筆數
  const [pageCount, setPageCount] = useState(0); //總頁數

  // 查詢條件用(這裡用的初始值都與伺服器的預設值一致)
  const [name_like, setNameLike] = useState('');
  const [country, setCountry] = useState([]); // 字串陣列
  const [breeds, setBreeds] = useState([]); // 字串陣列
  const [process, setProcess] = useState([]); // 字串陣列
  const [roast, setRoast] = useState([]); // 字串陣列

  const [price_gte, setPriceGte] = useState(0);
  const [price_lte, setPriceLte] = useState(4000);


  // 品牌選項陣列
  const countryOptions = [
    '台灣',
    '衣索比亞',
    '肯亞',
    '巴拿馬',
    '哥斯大黎加',
    '瓜地馬拉',
    '哥倫比亞',
    '巴西',
    '祕魯',
  ];
  const breedsOptions = ['阿拉比卡', '卡杜拉', '藝妓', '帝比卡'];

  const processOptions = [
    '水洗處理',
    '日曬處理',
    '半水洗處理',
    '半日曬處理',
    '葡萄乾蜜處理',
  ];

  const roastOptions = ['深烘焙', '中烘焙', '淺烘焙'];

  // 排序
  const [sort, setSort] = useState('p_id');
  const [order, setOrder] = useState('asc');

  // 分頁用
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(15);

  // 向伺服器獲取資料(建議寫在useEffect外，用async-await)

  const getProducts = async (params = {}) => {
    const baseURL = 'http://localhost:3005/api/product_list';
    // 轉換params為查詢字串

    const searchParams = new URLSearchParams(params);
    const qs = searchParams.toString();
    const url = `${baseURL}?${qs}`;

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

  // 品牌複選時使用(使用字串陣列狀態)
  const handleBrandChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (country.includes(tv)) {
      // 如果有===>移出陣列
      const nextCountry = country.filter((v) => v !== tv);
      setCountry(nextCountry);
    } else {
      // 否則===>加入陣列
      const nextCountry = [...country, tv];
      setCountry(nextCountry);
    }
  };

  //品種複選
  const handleBreedChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (breeds.includes(tv)) {
      // 如果有===>移出陣列
      const nextBreeds = breeds.filter((v) => v !== tv);
      setBreeds(nextBreeds);
    } else {
      // 否則===>加入陣列
      const nextBreeds = [...breeds, tv];
      setBreeds(nextBreeds);
    }
  };

  //處理法複選
  const handleProcessChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (process.includes(tv)) {
      // 如果有===>移出陣列
      const nextProcess = process.filter((v) => v !== tv);
      setProcess(nextProcess);
    } else {
      // 否則===>加入陣列
      const nextProcess = [...process, tv];
      setProcess(nextProcess);
    }
  };

  // 烘焙法複選時使用(使用字串陣列狀態)
  const handleRoastChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value;
    // 判斷是否有在陣列中
    if (roast.includes(tv)) {
      // 如果有===>移出陣列
      const nextRoast = roast.filter((v) => v !== tv);
      setRoast(nextRoast);
    } else {
      // 否則===>加入陣列
      const nextRoast = [...roast, tv];
      setRoast(nextRoast);
    }
  };
  // 按下搜尋按鈕
  const handleSearch = () => {
    // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁

    const params = {
      page: 1, // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁，向伺服器要第1頁的資料
      perpage,
      sort: sort,
      order: order,
      name_like: name_like,
      country: country.join(','),
      breeds: breeds.join(','), // 字串陣列需要轉換為逗點分隔(csv)字串
      process: process.join(','),
      roast: roast.join(','),
      price_gte: price_gte,
      price_lte: price_lte,
    };

    getProducts(params);
  };

  // 樣式2: didMount
  useEffect(() => {
    // 建立查詢字串用的參數值
    const params = {
      page,
      perpage,
      sort,
      order,
      country,
      breeds,
      process,
      roast,
      price_gte,
      price_lte,
    };

    // 向伺服器要求資料
    getProducts(params);
  }, [
    page,
    perpage,
    sort,
    order,
    country,
    breeds,
    process,
    roast,
    price_gte,
    price_lte,
  ]);

  return (
    <>
      <Categoraylist />

      <h1>商品列表頁</h1>
      <div>
        名稱:
        <input
          type="text"
          value={name_like}
          onChange={(e) => {
            setNameLike(e.target.value);
          }}
        />
        <div>目前搜尋:{name_like}</div>
      </div>
      <hr />
      <div>
        國家:
        {countryOptions.map((v, i) => {
          return (
            <label
              // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
              key={i}
            >
              <input
                type="checkbox"
                value={v}
                checked={country.includes(v)}
                onChange={handleBrandChecked}
              />
              {v}
            </label>
          );
        })}
      </div>
      <div>
        品種:
        {breedsOptions.map((v, i) => {
          return (
            <label
              // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
              key={i}
            >
              <input
                type="checkbox"
                value={v}
                checked={breeds.includes(v)}
                onChange={handleBreedChecked}
              />
              {v}
            </label>
          );
        })}
      </div>
      <div>
        處理法:
        {processOptions.map((v, i) => {
          return (
            <label
              // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
              key={i}
            >
              <input
                type="checkbox"
                value={v}
                checked={process.includes(v)}
                onChange={handleProcessChecked}
              />
              {v}
            </label>
          );
        })}
      </div>
      <div>
        烘焙法:
        {roastOptions.map((v, i) => {
          return (
            <label
              // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
              key={i}
            >
              <input
                type="checkbox"
                value={v}
                checked={roast.includes(v)}
                onChange={handleRoastChecked}
              />
              {v}
            </label>
          );
        })}
      </div>
      <div>
        價格大於:
        <input
          type="number"
          value={price_gte}
          onChange={(e) => {
            setPriceGte(Number(e.target.value));
          }}
        />
        小於:
        <input
          type="number"
          value={price_lte}
          onChange={(e) => {
            setPriceLte(Number(e.target.value));
          }}
        />
      </div>
      <hr />
      <div>
        <button onClick={handleSearch}>搜尋</button>
      </div>
      <hr />
      <div>
        <button
          onClick={() => {
            const nextPage = page - 1;
            // 最小是1
            if (nextPage >= 1) {
              setPage(nextPage);
            }
          }}
        >
          上一頁
        </button>
        <button
          onClick={() => {
            const nextPage = page + 1;
            // 最大是pageCount
            if (nextPage <= pageCount) {
              setPage(nextPage);
            }
          }}
        >
          下一頁
        </button>
        目前頁面 {page} / 總頁數: {pageCount} / 總筆數: {total}
      </div>
      <div>
        排序
        <select
          value={`${sort},${order}`}
          onChange={(e) => {
            const tv = e.target.value;
            setSort(tv.split(',')[0]);
            setOrder(tv.split(',')[1]);
            // 因改變排序最好也要跳回第一頁，以免造成使用者操作上的誤解
            setPage(1);
            console.log(tv);
          }}
        >
          <option value="p_id,asc">ID排序(由小至大)</option>
          <option value="p_id,desc">ID排序(由大至小)</option>
          <option value="p_price,asc">價格排序(由低至高)</option>
          <option value="p_price,desc">價格排序(由高至低)</option>
          <option value="p_sold,desc">銷量(由高至低)</option>
          <option value="p_date,desc">上架日期(由新至舊)</option>
          <option value="p_date,asc">上架日期(由舊至新)</option>
        </select>
      </div>
      <h2>使用動態路由:`[productId]`</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products &&
          products.map((item) => {
            return <ProductCard item={item} key={item.id} />;
          })}
      </div>
    </>
  );
}
