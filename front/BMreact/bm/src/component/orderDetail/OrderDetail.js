import React, { useEffect } from 'react'
import Loading from '../loading/Loading';
import style from './OrderDetail.module.css'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function OrderDetail() {

  const [orderDetail, setOrderDetail] = useState(null);
  
  const {orderNum} = useParams();
  const c = useParams();
  useEffect(()=>{
    console.log(c);
    (async ()=>{
      const {data} = await axios.get(`/orderDetail?orderNum=${orderNum}`);
      data.orderMenu = JSON.parse(data.orderMenuJson);
      console.log(data);
      setOrderDetail(data);
    })();

  },[])


  const MenuOptionList = (option)=>{
    const list = option.map((value, index)=>{
      return (
        <li key={value.optionId}>{value.name} {value.price.toLocaleString()}원</li>
      )
    })

    return (
      <ul>{list}</ul>
    )
  }



  const CartList = ()=>{
    const list = orderDetail.orderMenu.map((value, index)=>{

      return (
        <li key={index}>
          <div>
            <span>{value.menuName} {value.quantity}개</span>
            <ul className={style.menu_price}>
             <li>기본가격 {value.menuPrice.toLocaleString()}원</li>
              {MenuOptionList(value.option)}    
            </ul>
          </div>

          <div className={style.quantity}>
            <span>{value.total.toLocaleString()}원</span>
          </div>
        </li>
      )
    })

    return (
      <ul className={style.menu_list}>  
        {list}
      </ul>
    )
  }




  if(orderDetail === null) {
    return (
      <div className={style.order_detail_page}>
        <Loading></Loading>
      </div>
    )
  }
  

  return (
    <div className={style.order_detail_page}>
      <h1>주문 상세</h1>

      <div className={style.order_status}>
        <div>{orderDetail.deleveryStatus }</div>
        <h2>{orderDetail.storeName }</h2>

        <div>
          <div>
            주문일시 : {moment(orderDetail.orderDate).format("YYYY년 MM월 DD일(dd) a hh:mm ")}
          </div>
          <div>주문번호 : {orderDetail.orderNum }</div>
        </div>
		  </div>

      <CartList></CartList>

      <div className={style.price}>
        <div>
          <span>총 주문금액</span>
          <span>{orderDetail.totalPrice.toLocaleString()}원</span>
        </div>
        <div>
          <span>배달팁</span>
          <span>{orderDetail.deleveryTip.toLocaleString()}원</span>
        </div>

        {orderDetail.usedPoint !== 0 && 
          <div>
            <span>포인트 사용</span>
            <span>-{orderDetail.usedPoint.toLocaleString()}원</span>
          </div>
        }

        <div className={style.order_price}>
          <span>총 결제금액</span>
          <span>{(orderDetail.totalPrice + orderDetail.deleveryTip - orderDetail.usedPoint).toLocaleString()}원</span>
        </div>

        <div className={style.payMethod}>
          <span>결제방법</span>
          <span>{orderDetail.payMethod}</span>
        </div>
      </div>


      <div className={style.user_info}>
        <div>
          <div>배달주소</div>
          <div>{orderDetail.deleveryAddress}</div>
        </div>

        {/* <div>
          <div>전화번호</div>
          <div>{orderDetail.phone}</div>
        </div> */}

        <div>
          <div>요청사항</div>
          <div>{orderDetail.request}</div>
        </div>

      </div>





    </div>
  )
}

export default OrderDetail