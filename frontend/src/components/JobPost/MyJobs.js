
import React from 'react'

const MyJobs = () => {
  return (
    <>
        <div className='m-8 py-3'>
            <div className='mb-12'>
                <h1 className='md:text-5xl mb-3 text-3xl font-medium'>My jobs</h1>
                <h3 className='md:text-xl text-lg font-medium'>Earnings available now:</h3>
            </div>

            <div className='text:xl md:text-3xl font-medium mb-7'>
                <h1 className=''>Active contracts</h1> 
            </div>

            <div className='p-10 m-5 bg-gray-100 rounded-2xl'>
                <div className='grid place-content-center gap-8'>
                        <p className='flex justify-center text-2xl font-semibold'>There are no active contracts.</p>
                        <p className=''>Contracts you’re actively working on will appear here.</p>
                    <button className='bg-green-700 hover:bg-green-600 text-white p-2 px-5 rounded-3xl'>Search for new projects</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyJobs