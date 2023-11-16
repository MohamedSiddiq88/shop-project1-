import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/Context';

function TableRow({productId, image, productName, price, initialQuantity, id, initialSubTotal}) {
    const {fetchItemsData,totalItemPrice,setTotalItemPrice,cartItems}= useContext(MyContext);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [subTotal, setSubTotal] = useState(initialSubTotal);
    const [loading, setLoading] = useState(false);


    async function quantityHandle(action){
      setLoading(true);
        if(quantity!==1 || action!=="dec"){
            const newQuantity = action == 'inc' ? quantity + 1 : quantity - 1;
        const quantityDetail={
            userId:localStorage.getItem("userId"),
            productId:productId,
            quantity:newQuantity,
            subTotal:newQuantity*price
        }

        const res = await fetch('https://project1-backend-9whj.onrender.com/orders/update',{
      method:'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(
        quantityDetail
      )
      
    });
    if(res.ok){
        setQuantity(newQuantity);
        setSubTotal(newQuantity*price);
        await fetchItemsData();
    }
        }else{
          await  deleteItem()
        }
      setLoading(false);
        
    }

    function formattedCurrency(number){
      return number.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
      });
    }

    async function deleteItem(){
      setLoading(true);
        const res = await fetch('https://project1-backend-9whj.onrender.com/orders/delete',{
            method:'DELETE',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(
              {id}
            )
            
          }); 
          if(res.ok){
            await fetchItemsData();
            console.log(`fetchedItem  ${initialQuantity}  ${initialSubTotal} `)
          }
          setLoading(false); 
    }

useEffect(()=>{
  setQuantity(initialQuantity);
  setSubTotal(price*initialQuantity)
// console.log("cartItems", productName, initialQuantity, quantity, price*initialQuantity, subTotal)
},[cartItems])

    return (
    <tr>
      <td>
      <img src={image} className='image-cell'/>
      </td>
      <td>
        <p>{productName}</p>
      </td>
      <td>
        <div className={`quantity-btn-group ${loading ? 'loading-cursor' : ''}`}>
        <div  onClick={()=>quantityHandle("dec")}>-</div>
        <p>{quantity}</p>
        <div  onClick={()=>quantityHandle("inc")}>+</div>

        </div>
      </td>
      <td>
      <p>{formattedCurrency(subTotal)}</p>
      </td>
      <td>
      <i className={`fa-solid fa-trash trash ${loading ? 'loading-cursor' : ''}`}
  onClick={() => deleteItem()}></i>

      </td>
    </tr>
  )
}

export default TableRow
