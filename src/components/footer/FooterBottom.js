import React from 'react'
import { footerBottomItem } from '../../constant'
import  TwitterIcon  from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import CodeIcon from '@mui/icons-material/Code';
import { Link } from 'react-router-dom';




const FooterBottom = () => {
  return (
    <div>
        {/* ******************  AMAZONS AFFILIATE LINKS START HERE ****************** */}

       <div  className='w-full bg-footerBottom p-8'>
       <div className='max-w-5xl mx-auto'>
            <div className='w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-7 text-white gap-3 place-content-center'>
            {
                footerBottomItem.map((item) => (
                    <div className='group cursor-pointer' key={item._id}>
                        <h3 className='footerBottomTitle'>{item.title}</h3>
                        <p className='footerBottomText'>{item.des}</p>
                    </div>
                ))
            }
            </div>
        </div>
       </div>

       {/* ******************  AMAZONS AFFILIATE LINKS END HERE  ****************** */}
       {/* ******************  Contact Me And CopyWrite Start Here ****************** */}
       
        <div className='bg-black flex flex-col items-center justify-center text-[#DDD] leading-[40px] h-[20vh]'>

            <div className='font-medium  leading-[40px]'>
                You can contact me on any of this platform. I will respond between One - Two business day
            </div>
            <div className='w-[20%] flex justify-between'>
                <Link to="https://x.com/lord_bjey">
                <span className='cursor-pointer'> <TwitterIcon/> </span>
                </Link>
                <Link to="https://linkedin.com/in/mustapha-fathiu-7a85a422b">
                <span className='cursor-pointer'> <LinkedInIcon/> </span>
                </Link>
                <Link to="https://github.com/bolaji0">
                <span className='cursor-pointer'><GitHubIcon/></span>
                </Link>
                <Link to="mailto:bjmustapha48@gmail.com">
                <span className='cursor-pointer'><MailIcon/></span>
                </Link>
                <Link to="">
                <span className='cursor-pointer'><CodeIcon/></span>
                </Link>
            </div>


            <span className='font-semibold text-[12px]' >
              Copyright © 2024 Amazon by Mustapha Fathiu Bolaji
            </span>
         </div>
            
        {/* ****************** CopyWrite And Amazon Start Here  ***********/}
       
    </div>
    
  )
}

export default FooterBottom
