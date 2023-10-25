import { useContext, useState } from "react";
import { MyContext } from "../context/Context";

function Profile({ productId,image, productName, price, rate, count, setCount}) {
    const {fetchItemsData}=useContext(MyContext)
  const [loading, setLoading] = useState(false); 
    function formattedCurrency(number){
        return number.toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
        });
      }
    async function addtocart(pId,pImage,pName,pPrice,pRate,pQuantity){
      setLoading(true);
      const item ={
  productId:pId.toString(),      
  userId:localStorage.getItem("userId"),
  image:pImage,
  productName:pName,
  price:pPrice,
  subTotal:pPrice,
  rate:pRate,
  quantity:pQuantity
      }
  
      const res = await fetch('https://project1-backend-9whj.onrender.com/orders/create',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(
          item
        )
      });
      if (res.ok){
        fetchItemsData();
      }else{
        console.error('Error');
      }
      setLoading(false);

    }
  
  
    return (
      <div className="col-md-3 col">
        <div className={`card`} >
        <img src={image} alt={""} className='card-item' />
        
        <div className='card-item'>
        <h3><b>{productName}</b></h3>
        <h4>{formattedCurrency(price)} <s>{formattedCurrency(price+1100)}</s></h4>
        <h5 style={{color:"yellowgreen"}}>{rate}</h5>
        </div>
        <button type="button" class={`btn btn-primary card-item ${loading ? 'loading-cursor' : ''}`}  onClick={()=>{addtocart(productId,image, productName, price, rate, 1)}}>Add to Cart</button>
   
        </div>
      </div>
    );
  }


export default Profile
