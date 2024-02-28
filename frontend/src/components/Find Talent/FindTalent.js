import React from 'react'
import { Link } from 'react-router-dom'

const FindTalent = () => {
    return (
        <>
            <div className=' bg-red-300 p-4'>
                
                <div>
                    Left Side
                    <div>
                        <div>
                            <Link to='/talent-marketplace/'>
                                <span>Post a job and hire a pro</span> <br />
                                <span>Talent Marketplace</span>
                            </Link>
                        </div>
                        <div>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Link to='/talent-marketplace/'>
                                <span>Browse and buy projects</span> <br />
                                <span>Project Catalog</span>
                            </Link>
                        </div>
                        <div>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Link to='/talent-marketplace/'>
                                <span>Get advice from an industry expert</span> <br />
                                <span>Consultation</span>
                            </Link>
                        </div>
                        <div>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </div>
                <div>
                    Right Side
                </div>
            </div>
        </>
    )
}

export default FindTalent