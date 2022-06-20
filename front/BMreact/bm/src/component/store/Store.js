import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import style from './Store.module.css';
import { categoryList } from '../Main/Category';
import StoreList from './StoreList';

function Store() {
  const { category, address } = useParams();


  useEffect(() => {
    // const get = async () => {
    //   // const result = await axios.get("/api/storeList/"+ address);
    //   // console.log(result);
    //   console.log("가게목록");
    //   console.log(category , address);
    // }
    // get();

  }, []);



  // const get = async () => {
  //   const result = await axios.get("/api/storeList/" + address);
  //   console.log(result);
  //   console.log("가게목록");

  // }

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
    return (
      <div className={style.option}>
        <ul>
          <li data-sort="기본순" className={style.active}>기본순</li>
          <li data-sort="배달 빠른 순">배달 빠른 순</li>
          <li data-sort="배달팁 낮은 순">배달팁 낮은 순</li>
          <li data-sort="별점 높은 순">별점 높은 순</li>
          <li data-sort="리뷰 많은 순">리뷰 많은 순</li>
          <li data-sort="최소 주문 금액 순">최소 주문 금액 순</li>
        </ul> 
    </div>
    )
  }
 
 
  return (
    <div className={style.store}>
      <Category></Category>
      <Option></Option>

      <StoreList></StoreList>
      
    </div>
  )
}

export default Store;