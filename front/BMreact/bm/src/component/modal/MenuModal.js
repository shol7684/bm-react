import React, { useEffect } from 'react'
import './ModalCommon.css'
import style from  './MenuModal.module.css'
import { useState, useContext } from 'react';
import { modal } from './ModalCommon';
import Loading from '../loading/Loading';
import { StoreDetailContext } from './../../context';
import { setLocalCart } from '../../common';
import axios from 'axios';
import Swal from 'sweetalert2';




function MenuModal({selectMenu, close}) {
  const {storeDetail, cartList, setCartList, optionList} = useContext(StoreDetailContext); 
  
  const [loading, setLoading] = useState(true);
  const [menuOption, setMenuOption] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectOptionList, setSelectOptionList] = useState([]);
  const [selectOptionId , setSelectOptionId] = useState([]);

  useEffect(()=>{
    modal.BGscrollOff();

    const optionIds = selectMenu.optionIds;

   if(optionIds !== null) {
     const optionIdArr = optionIds.split(',')

    const menuOption = optionList.filter((v, i)=>{
      return optionList[i].optionId == optionIdArr[i];
    })

    setMenuOption(menuOption);
   }
   
    setLoading(false);
    

    return modal.BGscrollOn;
  },[])


  const MenuOption = ()=>{
    const list = menuOption.map((value, index)=>{
      const optionId = value.optionId;
      return (
        <li key={optionId}>
          <div>
            <label>
              <input type="checkbox" id={optionId} 
                checked={selectOptionId.includes(optionId) ? true : false }
                onChange={(e)=>selectOptin(e, value)}/>

              <i className="fas fa-check-square"></i>
              <span>{value.name}</span>
            </label>
          </div>

          <div>{value.price.toLocaleString()}원</div>
        </li>
      )
    })

    return (
      <ul className={style.menu_option}>
        {list}
      </ul>
    );
  }



  const quantityMinus = ()=>{
    if(quantity <= 1) return;

    setQuantity(quantity - 1);
  }

  const quantityPlus = ()=>{
    setQuantity(quantity + 1);
  }


  // 옵션 체크박스 선택
  const selectOptin = (e, value)=>{
    if(e.target.checked === true) {

      setSelectOptionId([...selectOptionId, value.optionId] );
      setSelectOptionList([...selectOptionList, value]);

    } else {
      const optionFilter = selectOptionList.filter((v, i)=>{

        return v !== value;
      })

      const optionIdFilter = selectOptionId.filter((v, i)=>{
        return v !== value.menuOptionId;
      })


      setSelectOptionList(optionFilter);
      setSelectOptionId(optionIdFilter);

    }

    // e.target.value = "off";
  }


  // 총 주문금액 보여주기
  const totalPrice = ()=>{
    const optionPriceTotal = selectOptionList.reduce((total, current)=>{
      return total + current.price;
    },0)
    return (selectMenu.price + optionPriceTotal) * quantity; 

   
  }

  // 메뉴이름, 가격, 옵션이 같은지 비교
  const cartCompare = (obj1, obj2)=>{
    return obj1.menuName === obj2.menuName &&
    obj1.menuPrice === obj2.menuPrice &&
    JSON.stringify(obj1.option) === JSON.stringify(obj2.option);
  }


  // 장바구니에 담기
  const addCart = ()=>{
    if(loading === true) {
      Swal.fire({
        html: "잠시후 다시 시도해주세요" 
      })
      return;
    }
    const data = {
      menuName : selectMenu.name,
      menuPrice : selectMenu.price, 
      quantity : quantity,
      option : selectOptionList.sort((a, b)=>{ return a.optionId - b.optionId}),
      total : totalPrice(),
    }


    // 카트에 이미 담겨져 있는지 확인 
    // 있다면 수량, 가격합계 증가
    for(let i=0;i<cartList.length;i++) {

      if(cartCompare(cartList[i], data)) {

        cartList[i].quantity += quantity;
        cartList[i].total += data.total;

        const newCart = [...cartList];
        setCartList(newCart); 
        setLocalCart(newCart);

        close();
        return;
      }
    }

    // 장바구니에 처음담거나 새로운 메뉴 담을때
    const newCart = [...cartList, data]; 
    setCartList(newCart);
    setLocalCart(newCart);

    close();
  }

  return (
    <>
      <div className="modal_bg" onClick={close}></div> 
      <div className="modal_wrap">
        <div className="modal_header center_alignment">
          <h1>메뉴 상세</h1>
          <button className="close" onClick={close}> 
            <i className="fas fa-times"></i>
          </button>
        </div>
          
        <div className={`modal_main ${style.menu_wrap}`}>
            {selectMenu.img === null ?
            <img src="/img/none.png" alt="이미지" className={style.menu_img} /> : 
            <img src={`/img/${selectMenu.img}`} alt="이미지" className={style.menu_img} />
            }

          <div className={style.menu_info}>

            {/* 메뉴 이름 + 메뉴 설명 */}
            <section>
              <h2 className={style.menu_name}>{selectMenu.name}</h2>
              <div className={style.menu_introduction}>
                {selectMenu.introduction}
              </div>
            </section>


            {/* 가격 */}
            <div className={style.menu_price}>
              <h2>가격</h2>
              <span className={style.menu_price}>{Number(selectMenu.price).toLocaleString()}원</span>
            </div>


            {/* 옵션 선택*/}
            {menuOption !== null &&
            <>
            <h2>옵션 선택</h2>
            <div className={style.option}>
              <MenuOption></MenuOption>
            </div>
            </>
            } 
            
            
            {/* 수량  */}
            <div className={style.quantity_wrap}>
              <h2>수량</h2>
              <div className={style.quantity_btn_wrap}>
                <button onClick={quantityMinus}>-</button>
                <span>{quantity}</span>
                <button onClick={quantityPlus}>+</button>
              </div>
            </div>
          </div>
        </div>

        <div className={style.total_wrap}>
          <div>배달최소주문금액 {storeDetail.minDelevery.toLocaleString()}원</div>
          <div className={style.total}>총 주문금액 {totalPrice().toLocaleString() }원</div>
        </div>

        <div className="modal_buttons">
          <button className="close" onClick={close}>취소</button>
          <button className="add_cart" onClick={addCart}>장바구니에 담기</button>
        </div>
      </div>
    </>
  )
}

export default MenuModal