import { useEffect, useState, useContext } from 'react';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import { MainContext } from './../../context';
import HeaderMenu from './HeaderMenu';

export function Header() {
  const {user} = useContext(MainContext);

  useEffect(() => {
    console.log("헤더");
  })


  return (
    <header>
      <div>
        <Link to="/">
          <img src="/img/baemin.jpg" alt="로고"></img>
        </Link>
      <HeaderMenu></HeaderMenu>
      </div>

    </header>
  );
}
