// import React from 'react'
import { useState } from 'react';

export const modal = {
  BGscrollOff : ()=>{
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
  },
  BGscrollOn : ()=>{
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }
}