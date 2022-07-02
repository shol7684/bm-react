import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import style from './Store.module.css';
import { categoryList } from '../Main/Category';
import StoreList from './StoreList';
import { useState } from 'react';
import Empty from '../empty/Empty';
import Loading from '../loading/Loading';

function Store() {
  const { category, address } = useParams();
  const [storeList, setStoreList] = useState(null);
  const [sort, setSort] = useState('기본순');

  useEffect(() => {
    getStoreList();

  }, [category, sort]);


  const getStoreList = async ()=>{
    const params = {
      category : category,
      address : address,
      sort : sort,
    }
    // const {data} = await axios.get(`/storeList/${category}/${address}`);
    const {data} = await axios.get(`/storeList`, {params});
    console.log(data);
    setStoreList(data.storeList);
  }


  const Category = () => {
    const c = Number(category);
    const list = categoryList.map(({category, categoryCode}, index)=>{
      return (
 
        <li key={categoryCode}>
          <Link to={`/store/${categoryCode}/${address}`} className={c === categoryCode ? style.active: ''} >
            {category}
          </Link>
        </li>
      )

    })
    return (

      <div className={style.category}>
        <ul>
          {list}
        </ul>
      </div>
    )
  }


  

  const Option = ()=>{
    const options = ['기본순', '배달 빠른 순', '배달팁 낮은 순', '별점 높은 순',
          '리뷰 많은 순', '최수 주문 금액 순'];


    const list = options.map((v, i)=>{
      return (
        <li key={i} onClick={()=>setSort(v)}
          className={v === sort ? style.active : ''}>{v}</li>
      )
      
    })


    return (
      <div className={style.option}>
        <ul>
          {list}
          {/* <li data-sort="기본순" className={style.active}>기본순</li>
          <li data-sort="배달 빠른 순">배달 빠른 순</li>
          <li data-sort="배달팁 낮은 순">배달팁 낮은 순</li>
          <li data-sort="별점 높은 순">별점 높은 순</li>
          <li data-sort="리뷰 많은 순">리뷰 많은 순</li>
          <li data-sort="최소 주문 금액 순">최소 주문 금액 순</li> */}
        </ul> 
    </div>
    )
  }
 


  if(storeList === null) {
    return (
      <div className={style.store}>
        <Category></Category>
        <Option></Option>
        <Loading></Loading>
      </div>
    )
  }

 
  return (
    <div className={style.store}>
      <section className={style.section1}>
        <Category></Category>
        <Option></Option>
      </section>

      <section className={style.section2}>
      {storeList.length === 0 ?
        <Empty img="/img/empty2.png"></Empty> :
        <StoreList storeList={storeList}></StoreList>
      }
      </section>
    </div>
  )
}

export default Store;