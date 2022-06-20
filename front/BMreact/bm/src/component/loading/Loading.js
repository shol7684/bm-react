import React from 'react'
import style from './Loading.module.css'


function Loading({bg}) {

  return (
    <>
      {bg !== false &&
        <div className={style.loading_bg}></div>
      }
      <div className={style.loading}>
        <div className={style.circle}></div>
      </div>
    </>
  )
}

export default Loading