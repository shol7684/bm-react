import React, { useEffect } from 'react'
import style from './Search.module.css'
import { useState, useContext, useRef, useLayoutEffect } from 'react';
import { MainContext, SearchContext } from './../../context';
import axios from 'axios';
import StoreList from './../store/StoreList';
import { getLocalStorage, setLocalStorage } from './../../common';
import PageNavigation from '../pageNavigation/PageNavigation';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Loading from './../loading/Loading';



function Search() {
  const [searchList, setSearchList] = useState(getLocalStorage("searchList") || []);
  const {address1, address2, setAddress1, setAddress2, history } = useContext(MainContext);
  const {searchHistory} = history;

  const searchInput = useRef(); // 검색목록 클릭시 input focus
  const [searchStoreList, setSearchStoreList] = useState([]);
  const [nonMessage, setNonMessage] = useState(false);
  const observeTarget = useRef(); // 바닥 감지 타겟
 

  const [loading, setLoading] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false); // 저장된 데이터 불러오기


  const currentPage = useRef(1);
  const searchKeyword = useRef("");
  const nextPage = useRef(false);
  const reset = useRef(true);


  const temp1 = useRef(); 
  const temp2 = useRef(); 

  useEffect(()=>{

    const scrollEvent = ()=>{
      searchHistory.scroll = window.scrollY;

      const y1 = temp1.current.getBoundingClientRect().y;
      const y2 = temp2.current.getBoundingClientRect().y;
      const y3 = temp2.current.getBoundingClientRect().top;
  
      if(y1 > y2 - 20 ) {
        if(temp1.current.style.boxShadow === 'none') {
          temp1.current.style.boxShadow = '0px 2px 3px 0px rgb(0 0 0 / 25%)';
        }
      } else {
        if(temp1.current.style.boxShadow !== 'none') {
          temp1.current.style.boxShadow = 'none';
        }
      }
    }

    window.addEventListener("scroll", scrollEvent);

    if(searchHistory.storeList.length !== 0) {
      setSearchStoreList(searchHistory.storeList);
      setSaveLoad(true);

    } else {
      searchInput.current.focus();
    }

    const observer = new IntersectionObserver(
      async ([entry])=>{
        if( entry.isIntersecting && nextPage.current === true) {
          observer.unobserve(observeTarget.current);
          nextPage.current = false;
          console.log("스크롤바닥");
          currentPage.current++;
          await getStoreList();

          observer.observe(observeTarget.current);
        }
      }, 
      { threshold: 1 });

    observer.observe(observeTarget.current);
  
    
    return ()=>{
      observer.disconnect();
      window.removeEventListener("scroll", scrollEvent);

      searchHistory.keyword = searchKeyword.current;
      searchHistory.nextPage = nextPage.current;
      searchHistory.currentPage = currentPage.current;
      searchHistory.reset = reset.current;
    }

  },[]);


  useEffect(()=>{
    searchHistory.storeList = searchStoreList;
  },[searchStoreList])


  useEffect(()=>{
    if(searchStoreList.length !==0) {
      console.log("2개 업데이트");

      currentPage.current = searchHistory.currentPage;
      searchKeyword.current = searchHistory.keyword;
      nextPage.current = searchHistory.nextPage;
      reset.current = searchHistory.reset; 
      console.log(searchHistory.scroll);
      window.scrollTo(0, searchHistory.scroll);

    }
  },[searchStoreList && saveLoad])




  // 최근 검색 목록
  const SearchList = ()=>{
    const list = searchList.map((v, i)=>{
      return (
        <li key={i}>
          <span value={v} onClick={()=>{searchKeyword.current = v; submit(v);}}>{v}</span>
          <button onClick={()=>{deleteSearchList(i)}}><i className="fas fa-times"></i></button>
        </li>
        )
      })

      return (
        <div  className={style.search_list_wrap}  ref={temp2}>
          <ul>{list}</ul>
        </div>
      )
  }


  // 검색창 엔터 입력
  const EnterHandler = (e)=>{
    if(e.key !== 'Enter') {
      return;
    }
    searchKeyword.current = e.target.value;
    submit();
  }


  const submit = ()=>{
    console.log("검색");
    if(searchKeyword.current.trim() === "") {
      return;
    }

    // 주소가 있는지 검사
    if(!address1 || !address2) {
      console.log("주소없음");
    }

    // setSearchStoreList([]);
    currentPage.current = 1;
    nextPage.current = false; 
    reset.current = true;
    searchInput.current.value = searchKeyword.current;
   
    getStoreList();
    
  }



  const getStoreList = async ()=>{      
    const params = {
      address : address1,
      searchKeyword : searchKeyword.current,
      page: currentPage.current
    };

    setLoading(true);

    const {data} = await axios.get("/store/search", {params}); 
    const {storeList, page} = data;

    setTimeout(()=>{
      if(reset.current === true) {
        setSearchStoreList(storeList);
      } else {
        setSearchStoreList((searchStoreList)=>[...searchStoreList, ...storeList]);
      }
      setNonMessage(storeList.length === 0);
      setLoading(false);
  
      reset.current = false;
      searchListUpdate();
      nextPage.current = page.nextPage;

    },200)
  }




  const searchListUpdate = ()=>{
    let newSearchList;
    if(searchList.includes(searchKeyword.current)) {
      newSearchList = [searchKeyword.current, ...searchList.filter((v,i)=>{
        return v !== searchKeyword.current;
      })] 
    } else {  
      newSearchList = [searchKeyword.current, ...searchList];
    }

    if(newSearchList.length > 9) {
      newSearchList = newSearchList.slice(0, 10);
    }

    setSearchList(newSearchList);
    setLocalStorage("searchList", newSearchList);
  }





  const deleteSearchList = (index)=>{
    const newSearchList = searchList.filter((v,i)=>{ 
      return index !== i;
    })
    setSearchList(newSearchList);
    setLocalStorage("searchList", newSearchList);
  }

  return (
    <main className={style.search_page}>
        <section className={style.section1} ref={temp1}>
          <section className="Main_address_search__6DYFf">
            <div className="Main_search_btn__wtExY center_alignment">
              <i className="fas fa-search"></i>
            </div>
            
            <input type="text" placeholder="어떤 가게를 찾으시나요?" 
              ref={searchInput}
              onKeyDown={EnterHandler} />
          </section>
        </section>

      <section className={style.section2}>
        <section className={style.notice}>
          현재 주소지를 기준으로 검색됩니다.
        </section>

        <SearchList></SearchList>

        <StoreList storeList={searchStoreList}></StoreList>

        {loading === true && <Loading bg={false} display={"block"}></Loading>}

        {nonMessage === true && <div>검색 결과가 없습니다</div>}  

        <div className='list_end' ref={observeTarget}></div>
        
      </section>
    </main>
  )
}

export default Search