import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TargetMarketPlace from './TargetMarketPlace';
import ProjectCatalog from './ProjectCatalog';
import Consultations from './Consultations';
import SmallCard from '../commons/SmallCard';

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
            <div className='p-4 flex items-center justify-between'>
                <div className='flex flex-col p-4 gap-4 border-solid border-r border-green-400'>
                    <div className={`flex items-center w-full p-6 gap-20 hover:bg-green-50 justify-between ${hoveredIndex === 0 ? 'bg-green-50' : ''}`} onMouseEnter={() => setHoveredIndex(0)}>
                        <div>
                            <Link to='/talent-marketplace/' className='flex flex-col'>
                                <span className='mb-2'>Post a job and hire a pro</span>
                                <span className='text-green-600 font-bold'>Talent Marketplace</span>
                            </Link>
                        </div>
                        <div>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className='flex items-center w-full p-6 gap-20 hover:bg-green-50 justify-between' onMouseEnter={() => setHoveredIndex(1)}>
                        <div>
                            <Link to='/talent-marketplace/' className='flex flex-col'>
                                <span className='mb-2'>Browse and buy projects</span>
                                <span className='text-green-600 font-bold'>Project Catalog</span>
                            </Link>
                        </div>
                        <div>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className='flex items-center w-full p-6 gap-20 hover:bg-green-50 justify-between' onMouseEnter={() => setHoveredIndex(2)}>
                        <div>
                            <Link to='/talent-marketplace/' className='flex flex-col'>
                                <span className='mb-2'>Get advice from an industry expert</span>
                                <span className='text-green-600 font-bold'>Consultation</span>
                            </Link>
                        </div>
                        <div>
                            <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </div>
                <div className='border-2 border-solid border-l border-gray-500 p-4 h-full'>
                    <SmallCard text='Hello Hi Yeah' url="https://img.freepik.com/free-photo/side-view-smiley-couple-indoors_23-2149903726.jpg?w=1060&t=st=1709120090~exp=1709120690~hmac=9b9bcc7f141f19aaa536683e43d6d9a366f40fb6dc757ec8e33766896a514c8a"/>
                    {(hoveredIndex !== null) && 
                        linkViewer
                    }
                </div>
            </div>
        </>
    )
}

export default FindTalent