
// 로컬스토리지에서 주소 가져오기
export const getLocalAddress = () =>{
  try {
     const address = localStorage.getItem("address");

     if(!address) {
        return null;
     }

     const today = +new Date();
     const data = JSON.parse(address);
     const {address1, address2, exp} = data;
     if(exp < today) {
        localStorage.removeItem("address");
        return null;
     }

     return data;

  } catch(e) {
     console.log(e);
     console.log("잘못된주소");
     localStorage.removeItem("address");
     return null;
  }
}



// 로컬스토리지에 주소 저장
export const setLoaclAddress = (address1, address2)=>{
  // 만료시간  일주일 후
 const exp = 1000 * 60 * 60 * 24 * 7;
 const today = +new Date();

 const data = {
    address1 : address1,
    address2 : address2,
    exp : today + exp,
 }

 localStorage.setItem("address", JSON.stringify(data));

}



// 로컬스토리지에서 장바구니 가져오기
export const getLocalCart = () =>{
  try {
     const cart = localStorage.getItem("cart");

     if(!cart) {
        return null;
     }


     return JSON.parse(cart);

  } catch(e) {
     localStorage.removeItem("cart");
     return null;
  }
}


export const setLocalCart = (cart) =>{
  localStorage.setItem("cart", JSON.stringify(cart));
}


// 비회원 id 만들기
// export const getGuestId = ()=>{
//    const gid = localStorage.getItem("gid");

//    if(gid === null) {
//       const newGid = `${+new Date()}_${Math.random().toString(36).substring(2,10)}`;
//       localStorage.setItem("gid", newGid);
//       return newGid;
//    }

//    return gid;
// }
