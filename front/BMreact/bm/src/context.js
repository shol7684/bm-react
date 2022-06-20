
import { createContext, useState } from "react";
import React from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [address1, setAddress1] = useState("");  // 우편번호
  const [address2, setAddress2] = useState("");  // 주소

  const [user, setUser] = useState(null) // 로그인 정보

  const [loading, setLoading] = useState(true);

  const value = {
    address1 : address1,
    address2 : address2,
    setAddress1 : setAddress1,
    setAddress2 : setAddress2,
    user : user,
    setUser : setUser,
    loading : loading,
    setLoading : setLoading,
  };

  return (
    <MainContext.Provider value={value}>{children}</MainContext.Provider>
  );
};



export const StoreDetailContext = createContext();

export const StoreDetailProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  const [storeDetail, setStoreDetail] = useState(null);  
  const [menuList, setMenuList] = useState(null);
  const [optionList, setOptionList] = useState(null);
  const [cartList, setCartList] = useState([]);

  const value = {
    storeDetail : storeDetail,
    setStoreDetail : setStoreDetail,
    menuList : menuList,
    setMenuList : setMenuList,
    optionList : optionList,
    setOptionList : setOptionList,
    isLoading : isLoading,
    setLoading : setLoading,
    cartList : cartList,
    setCartList : setCartList,
  };

  return (
    <StoreDetailContext.Provider value={value}>
      {children}
    </StoreDetailContext.Provider>
  );
};



export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(
  //   {
  //   userId : 1,
  //   username : "admin",
  //   nickname : "sumin",
  //   phone: "01012345678",
  //   point : 2000,
  // }
  null
  );  


  const value = {
    user : user,
    setUser : setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};