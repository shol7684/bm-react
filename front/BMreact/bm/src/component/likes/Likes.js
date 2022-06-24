import React from 'react'
import style from './Likes.module.css'
import Empty from './../empty/Empty';
import StoreList from '../store/StoreList';

function Likes() {
  const likesJson = localStorage.getItem("likes");

  const likes = likesJson !== null && JSON.parse(likesJson);

  console.log(likes);
  return (
    <>
    {!likes ? <Empty img="/img/empty_likes.png"></Empty> : 

    <div className={style.likes_page}>

      <h1>찜한가게</h1>
      
      {/* <StoreList></StoreList> */}
    </div>
    }
    </>
  )
}

export default Likes