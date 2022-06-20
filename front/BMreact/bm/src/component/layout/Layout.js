import { useEffect, useState, useContext } from 'react';
import style from './Nav.module.css';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  useEffect(() => {
    console.log("Layout");
  })


  return (
    <>
      <Header />
      <Outlet/>

      {/* <Footer /> */}

    </>
  );
}
