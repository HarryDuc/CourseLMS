import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.reload) {
      window.location.reload();
    }
  }, [location.state]);

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16'>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout