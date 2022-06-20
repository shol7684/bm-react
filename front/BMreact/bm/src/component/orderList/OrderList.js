import React, { useContext, useEffect } from 'react'
import style from "./OrderList.module.css"
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';
import Loading from './../loading/Loading';
import Empty from './../empty/Empty';
import PageNavigation from '../pageNavigation/PageNavigation';

function OrderList() {

  const location = useLocation();
  // const state = location.state;
  const [orderList, setOrderList] = useState(null);

  useEffect(()=>{
    
    const data = [
      {
        orderNum : 1,
        storeId : 1,
        storeName : "피자집",
        storeImg : "/img/pizza2.png",
        orderDate : new Date(),
        menuList : [
          {
            menuName : "불고기피자",
            menuPrice : 5000,
            quantity : 2,
          },
        ],
        deleveryStatus : "배달 준비 중",
      },
      {
        orderNum : 2,
        storeId : 1,
        storeName : "피자집2",
        storeImg : "/img/pizza2.png",
        orderDate : new Date(),
        menuList : [
          {
            menuName : "불고기피자",
            menuPrice : 5000,
            quantity : 1,
          },
          {
            menuName : "페퍼로니피자",
            menuPrice : 3000,
            quantity : 3,
          }
        ],
        deleveryStatus : "배달 준비 중",
      },
    ]


    setOrderList(data);
    // setOrderList([]);

  },[])


  const List = ()=>{
    const list = orderList.map((value, index)=>{
      console.log(value.orderDate);
      return (
        <li key={value.orderNum}>
          <div className={style.img_wrap}>
            <img src={value.storeImg}></img>
          </div>

          <div className={style.order_info}>
            <div>
              <span>{value.orderDate.getTime()}</span>
              <span>{value.deleveryStatus}</span>
            </div>

            <h2>{value.storeName}</h2>

            <div>
              <span>
                {value.menuList[0].menuName} 
                {value.menuList.length > 1 ? 
                  ` 외 ${value.menuList.length-1}개 ` : ` ${value.menuList[0].quantity}개 ` 
                } 
                {value.menuList.reduce((a,b)=>{return a+b.menuPrice},0).toLocaleString()}원
              </span>
            </div>
          </div>


          <div className={style.button_wrap}>
            <Link to={`/orderDetail/${value.orderNum}`} >상세보기</Link>
            <button>리뷰쓰기</button>
          </div>
        </li>
      )
    })

    return (
      <ul className={style.order_list}>
        {list}
      </ul>
    )
  }

  return (
    <>
    {/* 로딩중 */}
    {orderList === null && <Loading></Loading> }

    {/* 주문내역이 없을때 */}
    {(orderList !== null &&
      orderList.length === 0) && 
      <Empty img='/img/empty1.png'></Empty>
    }

    {(orderList !== null && 
      orderList.length > 0) &&
      <div className={style.order_list_page}>
          <h1>주문 내역</h1>
          <List></List>

          <PageNavigation size="5"></PageNavigation>
      </div>
    }
    </>
  )
}

export default OrderList