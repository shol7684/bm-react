import React from 'react'
import style from './Empty.module.css'


function Empty({img}) {
  return (
    <div className={style.empty_img_wrap}>
      <div>
        <img src={img}></img>
      </div>
    </div>
  )
}


export default Empty