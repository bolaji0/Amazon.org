import React, { useEffect, useRef, useState } from 'react';
import SideNavContent from './SideNavContent';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";






const HeaderBottom = () => {
  const [sideBar, setSideBar] = useState(false);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  // const handleShowAll = () => {
  //   setSideBar(!sideBar)
  // }

  const ref = useRef();

  // This is the effect you had commented out, now properly structured.
  useEffect(() => {
    document.body.addEventListener('click', (e)=>{
      if (e.target.contains(ref.current)){
        setSideBar(false)
      }
    });
    
  }, [ref,sideBar]);

  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light flex items-center text-white">
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li onClick={() => setSideBar(true)} className="headerHover flex items-center gap-1">
          <MenuIcon /> All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deal</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>

      {sideBar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-inherit bg-opacity-50">
          <div className="w-[50%] md:w-full h-full relative"> 
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[290px] h-full bg-white border border-black side-nav"
            >
              {
                userInfo && (
                  <div className="w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4 mb-4">
                    <AccountCircleIcon />
                    <h3 className="font-titleFont font-bold text-lg tracking-wide">{userInfo.userName}</h3>
                  </div>
                )
              }
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop by department"
                one="Electronics"
                two="Computer"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards"
                two="amazon live"
                three="international shopping"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your account"
                two="Customer Service"
                three="Contact us"
              />
              <span
                className="cursor-pointer absolute top-0 left-[300px] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border  bg-gray-200 hover:bg-red-500  hover:text-white duration-300"
                onClick={() => setSideBar(false)}
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
