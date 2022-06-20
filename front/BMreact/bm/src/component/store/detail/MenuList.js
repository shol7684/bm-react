import React, { useContext } from 'react'
import style from './MenuList.module.css';
import { StoreDetailContext } from './../../../context';
import MenuModal from '../../modal/MenuModal';
import { useState } from 'react';

function MenuList() {
  const {menuList} = useContext(StoreDetailContext);
  const [isOpen, setOpen] = useState(false);
  const [selectMenu, setSelectMenu] = useState({});

  const openModal = (value)=>{
    setSelectMenu(value);
    setOpen(true);
  }

  const closeModal = ()=>{
    setOpen(false);
  }

  const list = menuList.map((value, index)=>{
    return (
      <li onClick={()=>openModal(value)} key={value.menuId}>
        <div className={style.menu_info}>
          <h2>{value.name}</h2>
          <div>{value.price.toLocaleString()}원</div>
        </div>

        <div className={style.img_wrap}>
          {value.img === null ?
            <img src="/img/none.png" /> :
            <img src={`/img/${value.img}`} />
          }
        </div>
      </li>
    );
  })

  return (
    <div className={style.menuList}>
      <ul>
        {list}
      </ul>
      {isOpen === true && <MenuModal selectMenu={selectMenu} close={closeModal} />}
    </div>
  )
}

export default MenuList