
import React from 'react'

const Footer = () => {
  return (
    <>
        <div className='bg-green-950 rounded-xl m-5 md:p-7 p-1'>
            <div className=' md:flex justify-between font-extralight text-sm text-white ml-5'>
                <div className='mt-8 space-y-1'>
                    <p>About Us</p>
                    <p>Feedback</p>
                    <p>Community</p>
                </div>

                <div className='mt-8 space-y-1'>
                    <p>Trust, Safety & Security</p>
                    <p>Help & Support</p>
                    <p>Upwork Foundation</p>
                </div>

                <div className='mt-8 space-y-1'>
                    <p>Terms of Service</p>
                    <p>Privacy Policy</p>
                    <p>CA Notice at Collection</p>
                    <p>Cookie Settings</p>
                </div>

                <div className='mt-8 space-y-1'>
                    <p>Accessibility</p>
                    <p>Desktop App</p>
                    <p>Cookie Policy</p>
                    <p>Enterprise Solutions</p>
                </div>

            </div>

            <div className='md:flex justify-between p-5 text-white'>
                <div className='mt-5'>
                    <p>FOLLOW US</p>
                        
                </div>

                <div className='mt-5'>
                    <p>MOBILE APP</p>
                </div>
            </div>

            <div className="m-7 flex items-center border-t"></div>
            <p className='grid place-content-center text-white font-normal mb-10 text-xs md:shrink-0'>© 2015 - 2024 Upwork® Global Inc.</p>
            
        </div>
    </>
  )
}

export default Footer