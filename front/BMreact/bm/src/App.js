import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import { MainProvider, StoreDetailProvider, MainContext, SearchProvider } from './context';
import Order from './component/order/Order';
import OrderList from './component/orderList/OrderList';
import Likes from './component/likes/Likes';
import Loading from './component/loading/Loading';
import axios from 'axios';
import OrderDetail from './component/orderDetail/OrderDetail';
import 'moment/locale/ko';
import Search from './component/search/Search';
import { getLocalAddress } from './common';
import ScrollTop from './ScrollTop';
import MyStore from './component/manager/myStore/MyStore';
import Auth from './component/Auth/Auth';


 

function App() {
  const context = useContext(MainContext);
  const {user, setUser, loading, setLoading, address1, address2, setAddress1, setAddress2} = context;
  useLayoutEffect( ()=>{
    console.log("app 완료");
 
    const address = getLocalAddress();
      if(address !== null) {
         const {address1, address2} = address;
         setAddress1(address1);
         setAddress2(address2);
         console.log("주소 세팅");
      }

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
        <ScrollTop />
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

              {/* 주문 상세 */}
              <Route path="/orderDetail/:orderNum" element={
                <OrderDetail></OrderDetail>}>
              </Route>

              {/* 찜한가게 */}
              <Route path="/likes" element={ 
                <Likes></Likes> }>
              </Route>

              {/* 가게검색 */}
              <Route path="/search" element={ 
                <SearchProvider>
                <Search></Search>
                </SearchProvider> 
                }>
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
            <Route path="/order" element={
              <StoreDetailProvider>
                <Order />
              </StoreDetailProvider> 
              } >
            </Route>

            
            {/* 운영중인가게 */}
            <Route path="/manager/myStore" element={
              <Auth>
                <MyStore />
              </Auth>
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
