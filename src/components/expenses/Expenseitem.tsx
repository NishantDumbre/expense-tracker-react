import React from 'react'

const Expenseitem = () => {
  return (
    <div className=' w-5/12 inline-block my-2 py-4 border border-formBorder border-solid rounded-lg'>
        <div className='w-3/5 mx-auto object-contain border border-formBorder border-solid'>
            <img src='/assets/expenses/food.jpg' />
        </div>
        <div className='p-4'>
            <p className='font-bold text-xl'>Gone to pune</p>
            <p className='font-bold text-lg text-formBorder'>$500</p>
            <p className='pb-1'>12-4-202</p>
            <p className='text-lg'>this is a bgi big description description description</p>
        </div>
        <div className='flex justify-evenly items-center'>
            <button className='p-2 px-5  bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none'>Delete</button>
            <button className='p-2 px-5 bg-formBorder shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none'>Edit</button>
        </div>
    </div>
  )
}

export default Expenseitem