import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context, { MyContext } from '../context/Context';

function Nav(){
  const { count, setCount } = useContext(MyContext)
  const navigate = useNavigate();

    function signOut(){
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        navigate("/login")
    }
    return(
      <div id="nav" className='navbar navbar-dark bg-dark'>
        <div className='sub-nav'>
        <p onClick={()=>navigate("/")} className='nav-item'>Home</p>
        </div>
        <div className='sub-nav'>
        <p className='nav-item'>{localStorage.getItem("name")}</p>
        <button type="button" class="btn btn-light nav-item"  onClick={()=>{navigate('/cart')}}><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart <span id="count">{count}</span></button>
        <button type="button" class="btn btn-light nav-item"  onClick={()=>signOut()}>Sign Out</button>
        </div>
        
        
        
      </div>
    );
  }

export default Nav
