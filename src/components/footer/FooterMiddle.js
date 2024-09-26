import React from 'react';
import FooterMiddleLine from './FooterMiddleLine';
import { middleList } from '../../constant';
import { logo } from '../../assets';
import { NigerianFlag } from '../../assets';

const FooterMiddle = () => {
  return (
    <div className='w-full  bg-amazon_light text-white'>
      {/**********  Top Start here  ***********/}
      <div className='w-full border  border-b-[1px] border-gray-500 p-10'>
        <div className='max-w-5xl mx-auto z-10 text-gray-300 '>
          <div className='w-full gap-6 grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 md:place-items-center md:items-start '>
            {middleList.map((item) => (
              <FooterMiddleLine 
                key={item._id}
                title={item.title}
                ListItems={item.ListItems}
              />                                  
            ))}
          </div>
        </div>
      </div>
      {/**********  Top End here  ***********/}
      {/**********  Bottom Start Here  ***********/}

      <div className='w-full flex gap-6 items-center justify-center py-6 '>
        <div>
          <img className='w-20 pt-3' src={logo} alt='logo' />
        </div>
        <div className='flex gap-2'>
          <p className='flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow
           cursor-pointer duration-200 px-2 py-1'>English</p>
        </div>
        <div className='flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow
           cursor-pointer duration-200 px-2 py-1'>
        <img className='w-7 pt-' src={NigerianFlag} alt='logo' />
        <p>Nigeria</p>
        </div>
      </div>

      {/**********  Bottom End Here  ***********/}
    </div>
  );
}

export default FooterMiddle;
