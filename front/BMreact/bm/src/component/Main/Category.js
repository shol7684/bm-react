import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from './../../context';
import style from './Main.module.css';
import Swal from 'sweetalert2';


export const categoryList = [
  {
    category : "피자",
    imgSrc : "/pizza2.png",
    categoryCode : 100,

  },
  {
    category : "치킨",
    imgSrc : "/chicken1.png",
    categoryCode : 101,
  },
  {
    category : "패스트푸드",
    imgSrc : "/hamburger4.png",
    categoryCode : 102,
  },
  {
    category : "분식",
    imgSrc : "/bunsik1.png",
    categoryCode : 103,
  },
  {
    category : "카페/디저트",
    imgSrc : "/dessert2.png",
    categoryCode : 104,
  },
  {
    category : "돈까스/일식",
    imgSrc : "/cutlet1.png",
    categoryCode : 105,
  },
  {
    category : "중국집",
    imgSrc : "/chinese1.png",
    categoryCode : 106,
  },
  {
    category : "족발/보쌈",
    imgSrc : "/jockbal1.png",
    categoryCode : 107,
  },
  {
    category : "야식",
    imgSrc : "/jockbal2.png",
    categoryCode : 108,
  },
  {
    category : "한식",
    imgSrc : "/bibimbap.jpg",
    categoryCode : 109,
  },
  {
    category : "카테고리1",
    imgSrc : "/bibimbap.jpg",
    categoryCode : 110,
  },
];

function Category() {
  const {address1} = useContext(MainContext);

  const move = (e)=>{
    if(!address1) {
      e.preventDefault();
      Swal.fire({
        html: "주소를 입력해 주세요",
        confirmButtonText: '확인',
        allowOutsideClick: false,
     })
    }
  }    


  const category = categoryList.map(({category, imgSrc, categoryCode}, index)=>{
    return (
      <li key={index}>
        <Link onClick={(e)=>move(e)} to={`/store/${categoryCode}/${address1}`}  >
          <div className={style.img_wrap}>
            <img src={"/img" + imgSrc} alt="이미지" />
          </div>
          <div>
          </div>
          <div className={style.name}>{category}</div>
        </Link>
      </li>
    )
  })

  return <ul className={style.category}>
    {category}
  </ul>;
}

export default Category