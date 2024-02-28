import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MyJobs from './JobPost/MyJobs'


const Homepage = () => {
    return (
        <div>
            <Navbar />
            <MyJobs/>
            <Footer/>
        </div>
    )
}

export default Homepage