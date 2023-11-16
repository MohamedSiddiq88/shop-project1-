import React, { useContext, useEffect } from 'react'
import MainPage from './MainPage'
import { MyContext } from '../context/Context'
import TableRow from './TableRow'

function Cart() {
  const {cartItems,setCartItems, fetchItemsData, totalItemPrice} =useContext(MyContext)
  useEffect(()=>{
    async function callIt(){
      let result = await fetchItemsData();
      setCartItems(result)
       console.log("cart Items: ", await cartItems);
    }
    callIt();
},[])
function formattedCurrency(number){
  return number.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
}

useEffect(()=>{
  console.log("simple cart",cartItems)
  setCartItems(cartItems)
},[cartItems])
  return (
    
      <MainPage>
        <div className='cart-page'>
          <table className='cart-table'>
          <tr>
          <th>
            
          </th>
          <th>
          Name
          </th>
          <th>
          Quantity           
          </th>
          <th>
          Sub Total            
          </th>
          <th>
          Action            
            </th>
          </tr>
          {cartItems.map((ele,ind)=>(
        <TableRow 
        key={ind}
        image={ele.image}
        productName={ele.productName}
        initialQuantity={ele.quantity}
        productId={ele.productId}
        id={ele._id}
        price={ele.price}
        initialSubTotal={ele.subTotal}
        />
      ))}
          </table>
        
            <div className='total-div'>
              <p><b>Sub Total:</b> {formattedCurrency(totalItemPrice)}</p>
              <p><b>Shopping fee:</b> {totalItemPrice?formattedCurrency(5):0.00}</p>
              <p><b>Total:</b> {totalItemPrice?formattedCurrency(totalItemPrice+5):0}</p>
            </div>


        </div>
      
      </MainPage>
    
  )
}

export default Cart
