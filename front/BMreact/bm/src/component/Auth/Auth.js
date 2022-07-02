import React, { useContext, useEffect } from 'react'
import { MainContext } from './../../context';
import { Route, useNavigate } from 'react-router-dom';
import { Main } from './../Main/Main';
import { Nav } from '../layout/Nav';
import { useState } from 'react';
import Loading from './../loading/Loading';

function Auth({children}) {

  const {user} = useContext(MainContext);
  const navigate = useNavigate();
  // console.log(a.children);
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    console.log("운영가게");

    if(user.role === 'ROLE_USER1') {
      console.log("유저");
      navigate("/");
      return;
    } 

    setAuth(true);

  },[]);
  
  if(auth === false) {
    return <Loading bg={false}></Loading>;
  }


  return (
    children
  )
}

export default Auth