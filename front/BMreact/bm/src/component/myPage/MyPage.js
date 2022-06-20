import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import style from './MyPage.module.css';
import { Nav } from './../layout/Nav';
import { MainContext } from './../../context';
import axios from 'axios';

export function MyPage() {

  const {user, setUser} = useContext(MainContext);

   const logout = async ()=>{
      const result = await axios.post("/logout");
      setUser(null);
   }



  return (
    <div className={style.myPage}>
       <section className={style.title}>
         <h1>my 배민</h1> 
	    </section>


      <section className={style.menu_wrap}>
         <div className={style.login_box}>
            {user === null ? 
            <Link to="/login">
               <span>로그인을 해주세요</span>
            </Link> :
            <>
            <Link to="/my">
               <span>{user.nickname}</span>
            </Link>
            <button className={style.logout_btn} onClick={logout}>로그아웃</button>
            </>
            }  
         </div>

         <div className={style.menu}>
            <Link to="/point">
               <div>
                  <img src='/img/point.png' alt='이미지'/>
               </div>
               <div className={style.name}>포인트</div>
               </Link>
         </div>

         <div className={style.menu}>
            <Link to="/point">
               <div>
                  <img src='/img/coupon.png' alt='이미지'/>
               </div>
               <div className={style.name}>쿠폰함</div>
               </Link>
         </div>

         <div className={style.menu}>
            <Link to="/point">
               <div>
                  <img src='/img/gift.png' alt='이미지'/>
               </div>
               <div className={style.name}>선물함</div>
            </Link>
         </div>

         <div className={style.menu}>
            <Link to="/point">
               <div>
                  <img src='/img/likes.png' alt='이미지'/>
               </div>
               <div className={style.name}>찜한가게</div>
            </Link>
         </div>

         <div className={style.menu}>
            <Link to="/point">
               <div>
                  <img src='/img/order.png' alt='이미지'/>
               </div>
               <div className={style.name}>주문내역</div>
            </Link>
         </div>

         <div className={style.menu}>
            <Link to="/point">
               <div>
                  <img src='/img/review.png' alt='이미지'/>
               </div>
               <div className={style.name}>리뷰관리</div>
            </Link>
         </div>

      </section>

    </div>

  );
}
