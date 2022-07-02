import React, { useContext, useEffect } from 'react'
import style from "./OrderList.module.css"
import { Link, useLocation, useParams } from 'react-router-dom'
import { useState } from 'react';
import Loading from './../loading/Loading';
import Empty from './../empty/Empty';
import PageNavigation from '../pageNavigation/PageNavigation';
import axios from 'axios';
import { getGuestId } from './../../common';
import moment from 'moment';

function OrderList() {

  const {state} = useLocation();
  const [orderList, setOrderList] = useState(null);
  const {pageNum=1} = useParams();
  const [page, setPage] = useState();

  
  useEffect(()=>{
    console.log(pageNum);
    if(state === null) {
      // 주문목록 불러오기
      (async ()=>{
        const {data} = await axios.get(`/orderList?page=${pageNum}`);
        const {orderList, page} = data;

        orderList.forEach((v, i) => {
          orderList[i].orderMenu = JSON.parse(orderList[i].orderMenuJson);
        });

        setOrderList(orderList);
        setPage(page);
      })();
      return;
    }

  },[pageNum])


  const List = ()=>{
    const list = orderList.map((value, index)=>{
      return (
        <li key={value.orderNum}>
            <div className={style.img_wrap}>
              <Link to={`/store/detail/${value.storeId}`}>
              {value.storeImg === null ?
                <img src='/img/none.png'></img> :
                <img src={value.storeImg}></img>
              }
              </Link>
            </div>

            <div className={style.order_info}>
             <Link to={`/store/detail/${value.storeId}`}>
                <div>
                  <span>{moment(value.orderDate).format('yyyy-MM-DD(dd)')}</span>
                  <span>{` ${value.deleveryStatus}`}</span>
                </div>

                <h2>{value.storeName}</h2> 
                <div>
                  <span>
                    {value.orderMenu[0].menuName} 
                    {value.orderMenu.length > 1 ? 
                      ` 외 ${value.orderMenu.length-1}개 ` : ` ${value.orderMenu[0].quantity}개 ` 
                    } 
                    {(value.totalPrice + value.deleveryTip - value.usedPoint).toLocaleString()}원
                  </span>
                </div>
              </Link>
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


  {/* 로딩중 */}
  if(orderList === null) {
    return <Loading></Loading>;
  }

  {/* 주문내역이 없을때 */}
  if(orderList.length === 0) {
    return <Empty img='/img/empty1.png'></Empty>;
  }




  return (
    <div className={style.order_list_page}>
      <h1>주문 내역</h1>
      <List></List>

      <PageNavigation page={page}></PageNavigation>
    </div>
  )
}

export default OrderList