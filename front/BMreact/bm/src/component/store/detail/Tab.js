import React from 'react'
import style from './Tab.module.css'
import MenuList from './MenuList';
import Review from './Review';
import StoreInfo from './StoreInfo';
import { useState } from 'react';

function Tab() {
  const [tabNum, setTabNum] = useState(1);

  const tabChange = (num)=>{
    setTabNum(num);
  }
  
  return (
    <main className={style.menu}>
      <div className={style.menu_tab}>
        <ul>
          <li className={tabNum === 1 ? style.active : null} onClick={()=>tabChange(1)}>메뉴</li>
          <li className={tabNum === 2 ? style.active : null} onClick={()=>tabChange(2)}>정보</li>
          <li className={tabNum === 3 ? style.active : null} onClick={()=>tabChange(3)}>리뷰</li>
        </ul>
      </div>

      {tabNum === 1 && <MenuList></MenuList>}
      {tabNum === 2 && <StoreInfo></StoreInfo>}
      {/* {tabNum === 3 && <Review></Review>} */}
    </main>
  )
}

export default Tab