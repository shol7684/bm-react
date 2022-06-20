import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './component/layout/Header';
import './App.css';
import { Nav } from './component/layout/Nav';
import { Footer } from './component/layout/Footer';
import { MyPage } from './component/myPage/MyPage';
import { Login } from './component/login/Login';
import { Join } from './component/join/Join';
import { Layout } from './component/layout/Layout';
import { Main } from './component/Main/Main';
import Store from './component/store/Store';
import StoreDetail from './component/store/detail/StoreDetail';
import { MainProvider, StoreDetailProvider, MainContext } from './context';
import Order from './component/order/Order';
import OrderList from './component/orderList/OrderList';
import Likes from './component/likes/Likes';
import Loading from './component/loading/Loading';
import axios from 'axios';

 

function App() {
  const context = useContext(MainContext);
  const {user, setUser, loading, setLoading} = context;

  useLayoutEffect( ()=>{
    console.log("app 완료");

    const loginInfo = (async ()=>{
      const result = await axios.get("/loginInfo");
      const {user = null} = await result.data;
      setUser(user);
      setLoading(false);
    })();

    return;
  },[])

  if(loading === true) {
    return (
      <Loading></Loading>
    )
  }


  return (
    <>
      <BrowserRouter> 
        <Routes> 
          <Route element={ <Layout />}>

            {/* Nav 있어야 하는 페이지 */}
            <Route element={<Nav />} >
              {/* 메인페이지 */}
              <Route path="/" element={<Main />} ></Route>

              {/* 마이페이지 */}
              <Route path="/myPage" element={
                <StoreDetailProvider>
                  <MyPage />
                </StoreDetailProvider>} >
              </Route>
              
              {/* 가게 목록 */}
              <Route path="/store/:category/:address" element={<Store />} />

              {/* 주문 목록 */}
              <Route path="/orderList" element={
                <OrderList></OrderList>}>
              </Route>
              <Route path="/orderList/:pageNum" element={
                <OrderList></OrderList>}>
              </Route>

              {/* 찜한가게 */}
              <Route path="/likes" element={ 
                <Likes></Likes> }>
              </Route>

            </Route>
            {/* Nav 있어야 하는 페이지 */}


            {/* 가게 상세 */}
            <Route path="/store/detail/:storeId" element={
              <StoreDetailProvider>
                <StoreDetail />
              </StoreDetailProvider> } >
            </Route>



            {/* 주문하기 페이지 */}
            <Route path="/order/:storeId" element={
              <StoreDetailProvider>
                <Order />
              </StoreDetailProvider> 
              } >
            </Route>

            

          </Route>



          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes> 
        </BrowserRouter>

    </>

  );
}

export default App;
