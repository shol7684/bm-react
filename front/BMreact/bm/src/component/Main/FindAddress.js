import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Address } from './../Address';
import style from './Main.module.css';
import { MainContext } from './../../context';
import { getLocalAddress } from '../../common';
// import {getLocalAddress} from 'common.js'


export function FindAddress() {
   const {address1, address2} = useContext(MainContext);

   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const popupOpen = ()=>{
		setIsPopupOpen(true);
	}

	const popupClose = ()=>{
		setIsPopupOpen(false);
	}


   return (
      <section className={style.address_search}>
         <input type="hidden" placeholder="우편번호" value={address1 || ''} />
         <input type="text" onClick={popupOpen} value={address2 || ''} placeholder="주소를 입력해 주세요" readOnly ></input>

         <div className={`${style.search_btn} center_alignment`}>
            <i className="fas fa-search"></i>
         </div>
         {isPopupOpen === true && 
            <Address popupClose={popupClose}></Address>
         }
      </section>
   )
}
