import React from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import style from './PageNavigation.module.css'

function PageNavigation({page, queryString}) {
  const {pageNum = 1} = useParams();
  
  const searchParams = new URLSearchParams(window.location.search);

  let num;
  let url; 

  if(queryString === true) {
    num = Number(searchParams.get("page"));
    searchParams.set("page", '');
    url =  `${window.location.pathname.replace(`/${num}`, "")}?${searchParams.toString()}` ;
  } else {
    num = Number(pageNum);
    url = `${window.location.pathname.replace(`/${num}`, "")}/`;
  }
  

  const list = [];

  for(let i=page.navigationStart;i<=page.navigationEnd;i++) {
    
    list.push(
      <li key={i} className={num === i ? style.active : ''}>
        <Link to={`${url}${i}`}>{i}</Link> 
      </li>
    );
  } 

  return (
    <ul className={style.page_navigation}>
      {page.prevPage === true && 
        <li><Link to={`${url}${page.navigationStart -1}`}>이전</Link></li>
      }

      {list}

      {page.nextPage === true && 
        <li><Link to={`${url}${page.navigationStart + page.navigationSize}`}>다음</Link></li>
      }
    </ul>
  )
}

export default PageNavigation