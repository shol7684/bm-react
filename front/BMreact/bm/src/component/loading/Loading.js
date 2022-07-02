import React from 'react'
import style from './Loading.module.css'


function Loading({bg, display}) {
  return (
    <>
      {bg !== false &&
        <div className={style.loading_bg}></div>
      }
      {display !== "block" ?
      <div className={`${style.loading} ${style.fixed}`}>
        <div className={style.circle}></div>
      </div>  :

      <div className={`${style.loading} ${style.block}`}>
        <div className={style.circle}></div>
      </div>
      }   

    </>
  )
}

export default Loading