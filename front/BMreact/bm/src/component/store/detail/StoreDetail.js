import React, { useContext, useEffect, useState } from 'react'
import style from './StoreDetail.module.css';
import Cart from './Cart';
import Title from './Title';
import Tab from './Tab';
import { StoreDetailContext, MainContext } from './../../../context';
import Loading from './../../loading/Loading';
import MenuModal from './../../modal/MenuModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function StoreDetail() {
  const {storeDetail, setStoreDetail, 
    menuList, setMenuList, setOptionList} = useContext(StoreDetailContext);
  const {user} = useContext(MainContext);

  const {storeId} = useParams();
  useEffect(()=>{

    // const data = {
    //   storeId : 1,
    //   storeName : "피나치공",
    //   minDelevery : 1000,
    //   deleveryTime : 30,
    //   deleveryTip : 4500,
    //   likesCount : 152,
    //   reviewCount : 3,
    //   managerCommentCount : 3,
    //   scoreAvg : 4.5,
    //   score1 : 3,
    //   score2 : 4,
    //   score3 : 5,
    //   score4 : 6,
    //   score5 : 722,
    //   menuList : [
    //     {
    //       menuId : 1,
    //       menuName : "불고기피자",
    //       menuPrice : 5000,
    //       menuImg : "/img/pizza2.jpg",
    //       menuDescription : "맛있는 불고기피자 입니다",
    //       menuOption : [
    //         {
    //           menuOptionId : 1,
    //           menuOptionName : "베이컨 추가",
    //           menuOPtionPrice : 1000,
    //         }
    //       ]
    //     },
    //     {
    //       menuId : 2,
    //       menuName : "페퍼로니피자",
    //       menuPrice : 3500,
    //       menuImg : "/img/pizza2.png",
    //       menuDescription : "맛있는 페퍼로니피자 입니다",
    //       menuOption : [
    //         {
    //           menuOptionId : 1,
    //           menuOptionName : "베이컨 추가",
    //           menuOPtionPrice : 1000,
    //         }
    //       ]
    //     },
    //     {
    //       menuId : 3,
    //       menuName : "불고기버거",
    //       menuPrice : 500,
    //       menuImg : "/img/pizza2.png",
    //       menuDescription : "불고기버거 입니다",
    //       menuOption : [
    //         {
    //           menuOptionId : 1,
    //           menuOptionName : "감자튀김 추가",
    //           menuOPtionPrice : 500,
    //         }
    //       ]
    //     },
    //   ],
    //   reviewList : [
    //     {
    //       reviewId : 1,
    //       userId : 1,
    //       nickname : "sumin",
    //       score : 5,
    //       review : "잘먹었",
    //       regDate : new Date(),
    //       managerComment : "",
    //       reviewImg : "/img/pizza2.png"
    //     },
    //     {
    //       reviewId : 2,
    //       userId : 2,
    //       nickname : "sumin",
    //       score : 2,
    //       review : "잘먹었",
    //       regDate : new Date(),
    //       managerComment : "ㄳ",
    //       reviewImg : ""
    //     },
    //   ]
    // };
    // context.setStoreDetail(data);
    // setLoading(false);
    if(storeDetail === null) {
      (async ()=>{
        const result = await axios.get(`/store/detail/${storeId}`);
        setStoreDetail(result.data.storeDetail);
        setMenuList(result.data.menuList);
        setOptionList(result.data.optionList);

      })()
    }
  },[])

  if(storeDetail === null) {
    return (
      <Loading></Loading>
    )
  }


  return (
    <div className={style.store_detail}>
      <div>
        <Title></Title>
        <div className={style.wrap}>
          <Tab></Tab>
          <Cart></Cart>
        </div>
      </div>
        
    </div>
    


  )
}

export default StoreDetail