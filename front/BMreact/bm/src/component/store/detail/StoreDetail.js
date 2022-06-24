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
    console.log("실행");
    if(storeDetail === null) {
      (async ()=>{
        const result = await axios.get(`/store/detail/${storeId}`);
        setStoreDetail(result.data.storeDetail);
        setMenuList(result.data.menuList);
        setOptionList(result.data.optionList);

      })()
    }
  },[storeDetail])

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