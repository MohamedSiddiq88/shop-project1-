import React, { createContext, useEffect, useState } from 'react'


const MyContext = createContext();
function Context({children}) {
  const [totalItemPrice,setTotalItemPrice]=useState(0);
  const [count, setCount] = useState(0);
  const [cartItems,setCartItems]=useState([]);

  async function fetchItemsData(){
    const res = await fetch(`https://project1-backend-9whj.onrender.com/orders/all`,{
      method:"GET"
    });
    const restult= await res.json()
    setCartItems((pre)=>pre=restult.data);
    // const totalQuantity = restult.data.reduce((accumulator, currentItem) => {
    //   return accumulator + currentItem.quantity;
    
    // }, 0);
    // const totalPrice = restult.data.reduce((accumulator, currentItem) => {
    //   return accumulator + currentItem.subTotal;
    
    // }, 0);

    // setCount((pre)=>pre=totalQuantity)
    // setTotalItemPrice((pre)=>pre=totalPrice)

    console.log("simple",restult.data);
    return restult.data;
  }

  useEffect(() => {
    const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
  
    const totalPrice = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.subTotal;
    }, 0);
  
    setCount(totalQuantity);
    setTotalItemPrice(totalPrice);
    // console.log(cartItems)
  }, [cartItems]);

  useEffect(()=>{
     
  
      fetchItemsData()
  },[])
  return (
    <MyContext.Provider value={
      {
        count,
         setCount,
         cartItems,
         setCartItems,
         fetchItemsData,
         totalItemPrice,
         setTotalItemPrice
        }
      }>
      {children}
    </MyContext.Provider>
  )
}

export  { Context, MyContext }
