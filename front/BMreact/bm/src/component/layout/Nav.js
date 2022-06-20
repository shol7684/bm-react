import { useEffect, useState, useContext } from 'react';
import style from './Nav.module.css';
import { Link, Outlet } from 'react-router-dom';

export function Nav() {
  useEffect(() => {
    console.log("Nav");
  })


  return (
    <>
      <Outlet />
      <nav>
        <ul>
          <li><Link to="/"><img src='/img/nav1_2.png' /></Link></li>
          <li><Link to="/search"><img src='/img/nav2.png' /></Link></li>
          <li><Link to="/likes"><img src='/img/nav3.png' /></Link></li>
          <li><Link to="/orderList"><img src='/img/nav4.png' /></Link></li>
          <li><Link to="/myPage"><img src='/img/nav5.png' /></Link></li>
        </ul>
      </nav>
    </>
  );
}
