import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import style from './PageNavigation.module.css'

function PageNavigation({size}) {
  const {pageNum = 1} = useParams();
  const num = Number(pageNum);

  const url = window.location.pathname.replace(`/${num}`, "");

  console.log(url);

  const list = [];
  for(let i=1;i<=size;i++) {
    list.push(
      <li key={i} className={num === i ? style.active : ''}>
        <Link to={`${url}/${i}`}>{i}</Link>
      </li>
    );
  } 

  return (
    <ul className={style.page_navigation}>
      <li>
        <Link to="a">이전</Link>
      </li>
      {list}

      <li>
        <Link to="a">다음</Link>
      </li>
    </ul>
  )
}

export default PageNavigation