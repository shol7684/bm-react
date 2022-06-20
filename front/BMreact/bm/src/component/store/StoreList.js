import React from 'react'
import style from './StoreList.module.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Score from '../score/Score';
import Empty from './../empty/Empty';
import Loading from '../loading/Loading';
import axios from 'axios';

function StoreList() {
  document.title = "가게목록";
  const [storeList, setStoreList] = useState(null);
  const { category, address } = useParams();

  useEffect(()=>{
    setStoreList(null);
    (async () => {
      const result = await axios.get(`/storeList/${category}/${address}`);
      console.log(result.data);

      setStoreList(result.data);
      // setStoreList([]);
    })();
  }, [category])


  const List = ()=>{
    const list = storeList.map((value, index)=>{
      return (
        <li key={value.storeId}>
            <Link to={`/store/detail/${value.storeId}`} className={style.store}>
              <div className={style.img_wrap}>
                  {!value.storeImg ? 
                    <img src="/img/none.png" alt="이미지" /> : 
                    <img src={value.storeImg} alt="이미지" />
                  }
              </div>

              <div className={style.info_wrap}>
                <h2>{value.storeName}</h2>
                <div>
                  <span>평점 {value.scoreAvg.toFixed(1)}</span>
                  <Score score={value.scoreAvg}></Score>
                </div>

                <div>
                  <span>리뷰 {value.reviewCount}</span>
                  <span>사장님 댓글 {value.managerCommentCount}</span>
                </div>

                <div>
                  <span>최소주문금액 {value.minDelevery.toLocaleString()}원</span>
                  <span>배달팁 {value.deleveryTip.toLocaleString()}원</span>
                </div>

                <div>
                  <span>배달시간 {value.deleveryTime}분</span>
                </div>
              </div>

              {(value.open === false || value.businessTime === false) && 
                <div className={`${style.isOpen} center_alignment`} >
                  <span className=''>지금은 준비중입니다</span>
                </div>
              }
              
            </Link>
        </li>
      )
    })

    return (
      <ul className={style.store_list}>
        {list}
      </ul>
    );
  }




  if(storeList === null) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <>
      {storeList.length === 0 && <Empty img="/img/empty2.png"></Empty>}
      {storeList.length !== 0 && <List></List>}
    </>
  )
}

export default StoreList