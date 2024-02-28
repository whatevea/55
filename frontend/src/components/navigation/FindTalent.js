import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TargetMarketPlace from './TargetMarketPlace';
import ProjectCatalog from './ProjectCatalog';
import Consultations from './Consultations';

const FindTalent = () => {

    const [hoveredIndex, setHoveredIndex] = useState(0);

    const linkViewer = useMemo(() => {
        switch (hoveredIndex) {
            case 0:
                return <TargetMarketPlace />
            case 1:
                return <ProjectCatalog />;
            case 2:
                return <Consultations />;
            default:
                return null;
        }
    }, [hoveredIndex]);

    return (
        <>
            <div className='p-4 flex items-center justify-between border-2 border-solid border-green-300'>
                <div className='flex flex-col p-4 gap-10'>
                    <div className='flex items-center w-full border-2 border-solid border-green-300 hover:bg-d-300' onMouseEnter={() => setHoveredIndex(0)}>
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
                    <div className='flex items-center w-full border-2 border-solid border-green-300' onMouseEnter={() => setHoveredIndex(1)}>
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
                    <div className='flex items-center w-full border-2 border-solid border-green-300' onMouseEnter={() => setHoveredIndex(2)}>
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
                <div className='border-2 border-solid border-l border-gray-300 p-4'>
                    {(hoveredIndex !== null) && 
                        linkViewer
                    }
                </div>
            </div>
        </>
    )
}

export default FindTalent