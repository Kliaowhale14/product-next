import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/default-layout/layout';
import { P_LIST } from '@/configs/api-path';

export default function ProductList() {
  const [listData, setListData] = useState({
    totalRows: 0,
    page: 0,
    rows: [],
  });

  useEffect(() => {
    fetch(P_LIST)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <Layout title="商品列表－所有商品">
      <div className="card-group">
        <div className="card">
          <img src="img/img1.jpg" className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
      {listData.rows.map((r) => {
        return (
          <div className="card" key={r.pid}>
            <img src="img/img1.jpg" className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title" key={r.p_name}>
                Card title
              </h5>
              <p className="card-text" key={r.p_intro}>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text" key={r.p_price}>
                {/* <small className="text-muted">Last updated 3 mins ago</small> */}
              </p>
            </div>
          </div>
        );
      })}
    </Layout>
  );
}
