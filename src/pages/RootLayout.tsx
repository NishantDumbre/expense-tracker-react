import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const RootLayout = () => {
  return (
    <React.Fragment>
        <Header />
        <Outlet />
        <Footer />
    </React.Fragment>
  )
}

export default RootLayout