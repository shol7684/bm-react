import React from 'react'
import style from './Search.module.css'

function Search() {



  return (
    <main className={style.search_page}>
      <section className="Main_address_search__6DYFf">
        <div className="Main_search_btn__wtExY center_alignment">
          <i className="fas fa-search"></i>
        </div>
        
        <input type="text" placeholder="어떤 가게를 찾으시나요?" />
      </section>

      <section className={style.notice}>
        현재 주소지를 기준으로 검색됩니다.
      </section>

      <div className={style.search_list}>
        <ul>
          <li>
            <span>
    123
            </span>
            <button>x</button>
          </li>
          <li>ㄹㄴㅁ</li>
        </ul>
      </div>



    </main>
  )
}

export default Search