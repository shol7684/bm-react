import React, { useContext, useEffect, useState } from 'react'
import style from './Title.module.css';
import { StoreDetailContext } from './../../../context';
import Score from '../../score/Score';



function Title() {
  const {storeDetail} = useContext(StoreDetailContext);
  const {
    storeId, 
    storeName, 
    scoreAvg, 
    likesCount,
    reviewCount, 
    managerCommentCount,
    minDelevery,
    deleveryTime,
    deleveryTip,
  } = storeDetail;

  const [isLikes, setLikes] = useState(false);

  useEffect(()=>{
    const likes = localStorage.getItem("likes");
    if(likes !== null) {
      const arr = JSON.parse(likes);
      setLikes(arr.includes(storeId));
    }
  }, []);


  const addLikes = ()=>{
    
    const localStorageLikes = JSON.parse(localStorage.getItem("likes"));

    if(isLikes === false) {

      if(localStorageLikes === null) {
        localStorage.setItem("likes", JSON.stringify([storeId]));
        setLikes(true);
      }
      return;
    }

    if(isLikes === true) {

      setLikes(false);
      if(localStorageLikes.length === 1) {
        localStorage.removeItem("likes");
      } else {
        const newLikes = localStorageLikes.filter((value)=>{
          return value !== storeId;
        })
        localStorage.setItem("likes", JSON.stringify(newLikes));
      }
    }

  }

  return (
    <div className={style.title}>
      <h1>{storeName}</h1>
      
      <div>
        <Score score={scoreAvg}></Score>
        <span>{Number(scoreAvg).toFixed(1)}</span>

      <div>
        <span onClick={addLikes}>
          {isLikes === true && <i className="fas fa-heart"></i>}
          {isLikes === false && <i className="far fa-heart"></i>}
        </span>
        <span>찜</span>
        <span className={style.likes_count} >{likesCount}</span>
      </div>

      <div>
        <span>리뷰</span>
        <span className={style.review_count}>{reviewCount}</span>
        <span>사장님 댓글</span>
        <span>{managerCommentCount}</span>
      </div>

      <div>
        <span>최소주문금액</span>  
        <span>{minDelevery.toLocaleString()}원</span>
      </div>

      <div>
        <span>예상 배달시간</span>
        <span>{deleveryTime}분</span>
      </div>
                 
      <div>
        <span>배달팁</span>
        <span>{deleveryTip.toLocaleString()}원</span> 
      </div>
    </div>
  </div>
  )
}

export default Title