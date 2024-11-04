import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='text-primaryText'>
        <Header />
        <Outlet />
    </div>
  )
}

export default MainLayout