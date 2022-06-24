import React, { useContext, useEffect } from 'react'
import style from './Order.module.css'
import { MainContext, StoreDetailContext, UserContext} from './../../context';
import { getLocalAddress, setLocalCart } from '../../common';
import { useState, useRef } from 'react';
import { getLocalCart, getGuestId } from './../../common';
import { useParams, useNavigate } from 'react-router-dom';
import { Address } from './../Address';
import Swal from 'sweetalert2';
import Empty from '../empty/Empty';
import axios from 'axios';
import Loading from '../loading/Loading';

function Order() {
  
  const context = useContext(StoreDetailContext);
  const {storeDetail, setStoreDetail, cartList, setCartList, setMenuList, setOptionList} = context;

	const {user, setUser, address1, address2, setAddress1, setAddress2} = useContext(MainContext);
  const [addressDetail, setAddressDetail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [request, setRequest] =  useState(); // 요청사항
  const [payMethod, setPaymethod] = useState("신용카드");
  const [userPoint, setUserPoint] = useState(0);  // 유저가 가지고있는 포인트
  const [usedPoint, setUsedPoint] = useState(0); // 사용한 포인트
  const pointInput = useRef();  // 포인트 입력창 보여줄때
  const point = useRef(); // 사용핧 포인트 input값 가져올때

  const navigate = useNavigate();

  useEffect(()=>{
    let storeId;

    if(cartList.length === 0) {
      const cart = getLocalCart();
      if(cart !== null) {
        setCartList(cart);
        storeId = cart[0].storeId;
      } else {
        return;
      }
    }

    if(!address1 || !address2) {
      const localAddress = getLocalAddress();
      if(localAddress !== null) {
         const {address1, address2} = localAddress;
         setAddress1(address1);
         setAddress2(address2);
      }
    }

    // 새로고침해서 state 없어지면 다시 가져오기
    if(storeDetail === null) {
      (async ()=>{
        const result = await axios.get(`/store/detail/${storeId}`);
        setStoreDetail(result.data.storeDetail);
        setMenuList(result.data.menuList);
        setOptionList(result.data.optionList);
      })();
    }

    // 사용할수있는 포인트 복사
    if(user !== null) {
      setUserPoint(user.point);
    } else {
      isLogin();
    }
  }, []);


  // 주소 api on/off
  const popupOpen = ()=>{
		setIsPopupOpen(true);
	}

	const popupClose = ()=>{
		setIsPopupOpen(false);
	}

  // 로그인 할건지 묻기
  const isLogin = ()=>{
    Swal.fire({
      confirmButtonText: "로그인",
      showCancelButton: true,
      cancelButtonText: "비회원으로 주문하기",
      allowOutsideClick: false,
    })
    .then(({isConfirmed})=>{
      if(isConfirmed === true) {
        navigate("/login", {
          state: {
            redirect : window.location.pathname
          }
        });
      }
    })
  };


  // 장바구니 가격 합계 
  const calcCartTotal = ()=>{
    return cartList.reduce((total, current)=>{
      return total + current.total;
    },0);
  }


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


  
  const quantityMinus = ({quantity, total}, index)=>{
    if(quantity <= 1) return;

    const newCart = [...cartList];

    newCart[index].total -= (total / quantity);
    newCart[index].quantity -= 1;
    setCartList(newCart);
    setLocalCart(newCart);
  }
  
  const quantityPlus = ({quantity, total}, index)=>{
    const newCart = [...cartList];

    newCart[index].total += (total / quantity);
    newCart[index].quantity += 1;
    setCartList(newCart);
    setLocalCart(newCart);
  }


  // 장바구니 전부 비우기
  const cartDeleteAll = ()=>{
    localStorage.removeItem("cart");
    setCartList([]);
  }


  // 장바구니 한개 삭제
  const cartDeleteOne = (index)=>{
    const newCart = cartList.filter((v, i)=>{
      return i !== index;
    })

    if(newCart.length === 0) {
      cartDeleteAll();
    } else {
      setLocalCart(newCart);
      setCartList(newCart);
    }
  }


  // 장바구니 목록 가져오기
  const CartList = ()=>{
    const list = cartList.map((value, index)=>{

      return (
        <li key={index}>

          <div className={style.menu_name}>
            <span>{value.menuName}</span>
            <button onClick={()=>{cartDeleteOne(index)}}><i className="fas fa-times delete"></i></button>
          </div>

          <div className={style.menu_price}>
            <ul>
             <li>기본가격 {value.menuPrice.toLocaleString()}원</li>
              {MenuOptionList(value.option)}    
            </ul>
          </div>

          <div className={style.quantity}>
            <span>{value.total.toLocaleString()}원</span>

            <div className={style.quantity_btn_wrap}>
              <button onClick={()=>{quantityMinus(value, index)}}>-</button>
              <span>{value.quantity}</span>
              <button onClick={()=>{quantityPlus(value, index)}}>+</button>
            </div>
          </div>
        </li>
      )
    })

    return (
      <ul className={style.cart_list}>  
        {list}
      </ul>
    )
  }

  // 결제수단 체크박스변경
  const payMethodChange = (e)=>{
    setPaymethod(e.target.value);
  }

  // 주소 상세
  const addressDetailHandler = (e)=>{
    setAddressDetail(e.target.value);
  }

  // 요청사항
  const requestHandler = (e)=>{
    setRequest(e.target.value);
  }

  // 포인트 사용 input 
  const showPointInput = ()=>{
    const input = pointInput.current;
    const delay = 200;
    input.style.transition = `${delay}ms`;

    if(input.style.display === "flex") {
      input.style.opacity = "0";
      setTimeout(() => {
        input.style.display = "none";
      }, delay);
    } else {
      input.style.display = "flex";
      
      setTimeout(() => {
        input.style.opacity = "1";
      }, delay);
    }
  }


  // 포인트 사용
  const usePoint = ()=>{
    let p = point.current.value;

    // 입력 포인트가 유저가 가지고있는 포인트보다 많을때 
    // 유저 포인트로
    if(p > user.point) {
      p = user.point;
    }

    // 입력 포인트가 0 보다 작으면 0으로
    if(p < 0) {
      p = 0;
    }

    // 입력 포인트가 주문 가격보다 크면
    // 주문가격으로
    const totalPrice = calcCartTotal() + storeDetail.deleveryTip;
    if(p > totalPrice) {
      p = totalPrice;
    }
    setUserPoint(user.point - p)
    setUsedPoint(p);

    console.log(calcCartTotal());

  }

  // 뒤로가기
  const back = ()=>{
    navigate(`/store/detail/${cartList[0].storeId}`);
  }

  // 주문하기
  const order = async ()=>{
    const data = {
      cartList : cartList,
      storeId : cartList[0].storeId,
      usedPoint : usedPoint,
      totalPrice : calcCartTotal(),
      request : request,
      payMethod : payMethod,
      address : `${address2} ${addressDetail}`,
    };

    try {
      const result = await axios.post("/order", data);
      console.log(result);

      // Swal.fire({
      //   html: "주문이 완료되었습니다",
      //   confirmButtonText: "확인",
      //   allowOutsideClick: false,
      // })
      // .then(()=>{
      //   localStorage.removeItem("cart");
      //   navigate("/orderList",{
      //     state : result.data
      //   })
      // })


    } catch(e) {
      setUser(null);
      alert(e.response.data);
    }
     
  }




  
  if(cartList.length === 0) {
    return (
      <Empty img="/img/empty4.png"></Empty>
    )
  }


  if(storeDetail === null) {
    return (
      <Loading></Loading>
    )
  }



  return (
    <div className={style.order_page}>
      <h1>주문하기</h1>

      <div className={style.store_name}>
        <h2>{storeDetail.storeName}</h2>
        <button onClick={cartDeleteAll}>전체삭제</button>
      </div>

      <div>
        <h2>주문정보</h2>
        <CartList></CartList>
      </div>

      <div className={style.delevery_info}>
        <h2>배달정보</h2>
        <div>
          <span>주소 : {address2}</span>
          <button className={style.change_address} onClick={popupOpen} >주소변경</button>
          {isPopupOpen === true && 
              <Address popupClose={popupClose}></Address>
          }
        </div>
        <div>상세주소</div>
        <input className='input_base' onBlur={addressDetailHandler} />
        <div>전화번호</div>
        {user ?
          <input type="number" value={user.phone} readOnly pattern="\d*" className='input_base' /> :
          <input type="number" value='' pattern="\d*" className='input_base' onChange={()=>{console.log(123);}} /> 
        }
      </div>

      <div className={style.request}>
        <div>요청사항</div>
        <textarea onBlur={requestHandler}></textarea>
      </div>


      <div className={style.pay_method}>
        <h2>결제수단</h2>
        <label>
          <input type="radio" checked={payMethod === "신용카드"} 
            name="payMethod" readOnly 
            onChange={payMethodChange} value="신용카드" />
            신용카드
        </label>
        <label>
        <input type="radio" checked={payMethod === "현장에서 결제"} 
          name="payMethod" readOnly 
          onChange={payMethodChange} value="현장에서 결제" />
          현장에서 결제
        </label>
      </div>


      <div className={style.point}>
        <h2>포인트</h2>
        <div className={style.use_point_wrap}>
          <div>
            {user !== null && 
              <>
              <span>{user.point.toLocaleString()}원 사용가능</span>
              <button className={style.show_input} onClick={showPointInput}>
                <i className="fas fa-chevron-down"></i>
              </button> 
              </>
            }
            {user === null && 
              <span style={{color : "#ddd"}}>로그인 후 사용가능합니다</span>
            }
          </div>

          <div ref={pointInput} className={style.point_input}>
            <input type="number" pattern="/d" placeholder='사용 할 포인트' ref={point} />
            <button className={style.use_point} onClick={usePoint} >사용하기</button>
          </div>

        </div>
      </div>

      <div>
        <div>주문금액 : {calcCartTotal(cartList).toLocaleString()}원</div>
        {Object.keys(storeDetail).length !== 0  && 
          <>
          <div>배달팁 {storeDetail.deleveryTip.toLocaleString()}원</div>
          {usedPoint !== 0 && 
            <div>포인트 사용 -{usedPoint.toLocaleString()}원</div>
          }

          <div>{(calcCartTotal() + storeDetail.deleveryTip - usedPoint).toLocaleString() }원 결제하기</div> 
          </>
        }
      </div>

      <div className={style.btn_wrap}>
        <button className={style.order_btn} onClick={back}>뒤로가기</button>
        <button className={style.order_btn} onClick={order}>주문하기</button>
      </div>
    </div>
  )
}

export default Order