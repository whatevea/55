import React from 'react'

const SmallCard = ({text, url}) => {
  return (
    <div className='w-[168px] h-[165px] flex flex-col items-center rounded-t-lg border-2 border-solid border-gray-400 text-sm font-bold'>
        <img src={url} alt={text} className='rounded-t-lg w-[168px] h-[105px] mb-1' />
        <p className='text-center w-[140px] h-[60px] py-2'>{text}</p>
    </div>
  )
}

export default SmallCard