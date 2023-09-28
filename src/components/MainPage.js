import React from 'react'
import Nav from './Nav'

function MainPage({children}) {
  
  return (
    <div>
      <Nav/>
      <div className='main-page-body'>
        {children}
      </div>
    </div>
  )
}

export default MainPage
