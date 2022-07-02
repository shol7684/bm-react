import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { MainContext } from '../../../context'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import style from './MyStore.module.css'

function MyStore() {

  const {user} = useContext(MainContext);
  const navigate = useNavigate();
  const [storeList, setStoreList] = useState([]);


  useEffect(()=>{
    const list = [
      {
        storeId : 1,
        storeName : "abc",
        address1 : "310",
        address2 : "천안 두정동",
        address3 : "5층",

      },
      {
        storeId : 2,
        storeName : "abc2",
        address1 : "310",
        address2 : "천안 두정동",
        address3 : "5층",

      },
    ]

    setStoreList(list);


  },[])

  const MyStoreList = ()=>{
    const list = storeList.map((v, i)=>{
      return (
        <li key={v.storeId}>
          <div>
            <div>{v.storeName}</div>
            <div>{v.address2} {v.address3}</div>
          </div>

          <div className={style.link_wrap}>
            <Link to={`/manager/order/${v.storeId}`}>주문 접수</Link>
            <Link to={`/manager/modify/${v.storeId}`}>가게 수정</Link>
            <Link to={`/manager/sales/${v.storeId}`}>매출 확인</Link>
          </div>

        </li>
      )
    })

    return (
      <ul className={style.store_list}>{list}</ul>
    )
  }



  return (
    <main className={style.my_store}>
      <h1>운영중인가게</h1>

      {storeList.length !== 0 ? 
        <MyStoreList></MyStoreList> :
        <div>가게없음</div>
      }

    </main>
  )
}

export default MyStore