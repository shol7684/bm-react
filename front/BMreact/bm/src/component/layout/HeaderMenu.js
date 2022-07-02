import React, { useContext } from 'react'
import style from './HeaderMenu.module.css'
import { MainContext } from './../../context';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function HeaderMenu() {
  const {user} = useContext(MainContext);

  console.log(user.role === 'ROLE_USER');
  const [show, setShow] = useState(false);
  
  const menu = useRef();
  
  
  if(user.role !== 'ROLE_USER') {
    return;
  }
  
  const menuHide = ()=>{
    menu.current.className = `${style.menu} ${style.active_hide}`;
    setTimeout(()=>{
      setShow(false);
    },100)
  }

  return (
  <div>

    <div className={style.header_menu_button} onClick={()=>setShow(true)}>
      <span> </span>
      <span> </span>
      <span> </span>
    </div>

    {show === true && 
    <>
    <div className={style.menu_background} onClick={()=>menuHide()}></div>
    <div className={`${style.menu} ${style.active_show}`} ref={menu}>
      <ul>
        <li><Link to="/manager/myStore">운영중인가게</Link></li>
        <li><Link to="/">홈으로</Link></li>
      </ul>
    </div>
    </>
    }

  </div>

  )
}

export default HeaderMenu