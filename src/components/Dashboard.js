import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MainPage from './MainPage';
import Context, { MyContext } from '../context/Context';
import Profile from './Profile';

function Dashboard() {
  const navigate = useNavigate();
  const { count, setCount } = useContext(MyContext)
  

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  // const [count, setCount] = useState(0);
  const [data,setData]=useState([]);

useEffect(()=>{
    async function fetchData(){
      const res = await fetch(`https://project1-backend-9whj.onrender.com/menu/all`,{
        method:"GET"
      });
      const restult= await res.json()
      setData((pre)=>pre=restult);
    }

    fetchData()
},[])


  return (
    <MainPage>
        <div>
    
    <Heading/>
    <div className='fluid-container'>
    <div className='row'>
      
    
    {data.map((card, index) => (
      
      <Profile
        key={index}
        productId={card._id}
        image={card.image}
        productName={card.productName}
        price={card.price}
        rate={card.rate}
        count={count}
        setCount={setCount}
        
      />
    ))}
      </div>
    </div>
  </div>
    </MainPage>
);
}

export default Dashboard



function Heading(){
  return (
    <div id="heading">
      <p>SHOP HERE</p>
    </div>

  );
}

