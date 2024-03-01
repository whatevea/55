import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const Consultations = () => {
  return (
    <div className='flex items-center gap-10'>
      <div className='flex flex-col gap-3'>
        <h1 className='font-normal'>Consultations</h1>
        <p className='w-64 text-gray-600 text-sm'>
          Explore what is possible with an industry expert. See their availability and book a time that works for you.
        </p>
        <a className='text-green-500 flex items-center text-sm'>
          <span className='mr-2'>Explore all categories</span> <FaArrowRightLong /> 
        </a>  
      </div>
      <div className="flex gap-2 w-60 flex-wrap">
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
        <div className='w-16 h-20 border border-slate-400 text-center'>
          Card
        </div>
        <div className='w-16 h-20 border border-slate-400 text-center'>
          Card
        </div>
        <div className='w-16 h-20 border border-slate-400 text-center'>
          Card
        </div>
        <div className='w-16 h-20 border border-slate-400 text-center'>
          Card
        </div>
        <div className='w-16 h-20 border border-slate-400 text-center'>
          Card
        </div>
      </div>
    </div>
  )
}

export default Consultations