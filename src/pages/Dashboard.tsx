import React from 'react'
import { BACKGROUND_IMG } from '../utils/constants'

const Dashboard = () => {
  return (
    <div style={{ backgroundImage: BACKGROUND_IMG }} className='h-screen bg-cover bg-fixed'>
      Expense home
    </div>
  )
}

export default Dashboard