import React, { useRef, useState, useEffect } from 'react';
import { logo, NigerianFlag, usFlag } from '../assets';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { allItems } from '../constant/index.js';
import HeaderBottom from './HeaderBottom.js';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { logOut, setSearchResults } from '../redux/amazonSlice.js';
import { useNavigate, createSearchParams  } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom'
import ArrowDropDownOutlined from '@mui/icons-material/ArrowDropDownOutlined';





const Header = () => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("")
  const ref = useRef();
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useHistory hook to get history object
  const data = useLoaderData()
  //const productData = data.data;
  
  
  const productData = (data && data.data) ? data.data : [];
  const handleShowAll = () => {
    setShowAll(!showAll); // Toggle showAll on click
  };

  // Access the products array from the correct path in the Redux state
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);


  useEffect(()=>{
    document.body.addEventListener('click', (e) =>{                 
      if (e.target.contains(ref.current)){
        setShowAll(true)
      }
    })
  })

  const handleLogout = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("successfully signed out")
      dispatch(logOut())
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }


  const handleSearch = (e) => {
    e.preventDefault();
    
   // console.log('Products:', products);
  
    const searchResults = products.filter((item) => 
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    
    console.log('Search Results:', searchResults);
  
    dispatch(setSearchResults(searchResults));
  
    navigate({
      pathname: "search",
      search: `?searchTerm=${encodeURIComponent(search)}`
    });
  };
  
  


  return (
    <div className='w-full sticky top-0 z-50'>
      <div className='w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4'>
        {/* *************  Image start here  ****************    */}
        <Link to="/">
          <div className='headerHover'>
            <img className='w-24 mt-2' src={logo} alt='logo'></img>
          </div>
        </Link>
        {/* *************  Image end here  ****************    */}
        {/* *************  Deliver start here   *****************/}
        <div className='headerHover hidden md:flex'>
          <LocationOnOutlinedIcon />
          <p className='text-sm text-lightText font-light flex flex-col'>
            Deliver to 
            <span className='text-sm text-whiteText -mt-1 font-semibold'>Nigeria</span>
          </p>
        </div>
        {/* *************  Deliver end here  ****************    */}
        {/* *************  Search start here  ****************    */}
        <div className='h-10 rounded-md hidden lgl:flex flex-grow relative '>
          <span 
            onClick={handleShowAll} 
            className='w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer 
              duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center
              rounded-tl-md rounded-bl-md'>
            All
            <span><ArrowDropDownOutlinedIcon /></span>
          </span>
          {showAll && (
            <div className='w-full h-screen text-black fixed top-0 right-0 bg-opacity-50'>
             <div className='w-full'>
              <div ref={ref}  className='absolute w-56 h-80 left-[16.8rem] top-[3.5rem] overflow-y-scroll
                 overflow-hidden bg-white border-[1px]border-amazon_blue text-black p-2 flex-col gap-1 z-50'>
                 {allItems.map((item) => (
                  <li 
                    key={item._id} 
                    className='text-sm tracking-wide font-titleFont border-b-[1px]
                    border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200'>
                    {item.title}
                  </li>
                ))}
              </div>
             </div>
            </div>
          )}
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
            placeholder="Search..."
          />
          <span 
              onClick={handleSearch}
              className="w-12 h-full flex items-center justify-center bg-amazon_yellow 
                hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md
                rounded-br-md"
            >
            <SearchOutlinedIcon 
            />
          </span>
        </div>
        {/* *************  Search end here  ****************    */}
        {/* *************  Language start here   *****************/}

        <div className='headerHover hidden md:flex'>
        <p className='text-sm text-lightText py-2 font-light flex items-center justify-center'>
            <img src={usFlag} className='w-6 flex items-center justify-center' />
            <span className='text-sm text-whiteText -mt-1 font-semibold'>EN<ArrowDropDownOutlined/></span>
          </p>
        </div>

        {/* *************  Language end here  ****************    */}
        {/* *************  Signin start here  ****************    */}
        <Link>
          <div className='flex flex-col items-start justify-center headerHover'>
            {userInfo ? (
              <div>
                <p className='text-sm mdl:text-xs text-lightText font-light'>{userInfo.userName}</p>
                <p className='text-sm font-semibold -m-1 text-whiteText hidden mdl:inline-flex'>
                  Accounts & Lists {" "}
                  <span><ArrowDropDownOutlinedIcon /></span>
                </p>
              </div>
            ) : (
              <Link to="/signin">
                 <div>
                <p className='text-sm mdl:text-xs text-lightText font-light'>Hello, Sign In</p>
                <p className='text-sm font-semibold -m-1 text-whiteText hidden mdl:inline-flex'>
                  Accounts & Lists {" "}
                  <span><ArrowDropDownOutlinedIcon /></span>
                </p>
              </div>
              </Link>
            )} 
          </div>
        </Link>
        {/* *************  Signin end here  ****************    */}
        {/* *************  Orders start here  ****************    */}
        <div className='hidden lgl:flex flex-col items-start justify-center headerHover'>
          <p className='text-xs text-lightText font-light'>Returns</p>
          <p className='text-sm font-semibold -m-1 text-whiteText'>& Orders</p>
        </div>
        {/* *************  Orders end here  ****************    */}
        {/* *************  Cart start here  ****************    */}
        <Link to="/Cart">
          <div className='flex items-start justify-center headerHover relative'>
            <ShoppingCartCheckoutIcon />
            <p className='text-xs font-semibold mt-3 text-whiteText'>
              Cart 
              <span className='absolute text-xs top-0 left-6 font-semibold p-1 h-4 bg-[#f3a847]
                text-amazon_blue rounded-full justify-center items-center'>
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
        {/* *************  Cart end here  ****************    */}
        {/* *************  Logout start here  ****************    */}
        {userInfo && (
          <div 
            onClick={handleLogout}
            className='flex flex-col justify-center items-center headerHover'>
            <LogoutIcon className='text-center' />
            <p className='hidden mdl:inline-flex font-semibold text-sm'>Log Out</p>
          </div>
        )}
        {/* *************  Logout end here  ****************    */}
      </div>
      <HeaderBottom />
    </div>
  );
};

export default Header;
