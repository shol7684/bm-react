import React, { useContext, useDebugValue } from 'react'
import style from './StoreInfo.module.css'
import { StoreDetailContext } from './../../../context';

function StoreInfo() {
  const {storeDetail} = useContext(StoreDetailContext);

  return (
    <div>
      <ul className={style.store_info} >
	    	<li>
          <h2>찾아 오시는 길</h2>
          
          <div className={style.map_wrap}>
            <div id="map"></div>
            
            <div className={style.position}>
              <button className="store_positon"><i className="far fa-dot-circle"></i> 가게 위치로</button>
              <button className="user_position"> <i className="far fa-dot-circle"></i> 내 위치로</button>
            </div>
          </div>
          
          <h2>위치안내</h2>
          <div>주소 : {storeDetail.storeAddress2} {storeDetail.storeAddress3}</div>
			  </li>
			

        <li>
          <h2>가게 소개</h2>
          <div>{storeDetail.storeIntroduction}</div>
        </li>
            

        <li className={style.business_info}>
          <h2>영업 정보</h2>

          <div>
            <div className={style.info_title}>
              <div>상호명</div>
              <div>영업시간</div>
              <div>전화번호</div>
            </div>
            
            <div>
              <div>{storeDetail.storeName}</div>
              <div>
                <span>{storeDetail.openingTime}</span>
                <span>~</span>
                <span>{storeDetail.closingTime}</span>
              </div>
              <div>{storeDetail.storePhone}</div>
            </div>
          </div>
        </li>
            
        <li className={style.statistics}>
          <h2>가계 통계</h2>
          <div>
            <div className={style.info_title}>
              <div>최근 주문수</div>
              <div>전체 리뷰 수</div>
              <div>찜</div>
            </div>
            
            <div>
              <div>{storeDetail.orderCount}</div>
              <div>{storeDetail.reviewCount}</div>
              <div>{storeDetail.likesCount}</div> 
            </div>
          </div>	
        </li>
	    </ul>
    </div>
  )
}

export default StoreInfo